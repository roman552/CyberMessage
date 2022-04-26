const express = require("express");
const session = require("express-session");
const sharedsession = require("express-socket.io-session");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const next = require("next");
const { createServer } = require("http");
const { Server } = require("socket.io");

const { connectToDB } = require("./database");
const { userModel } = require("./models/user");
const { contactsModel } = require("./models/contacts");
const { MessagesModel } = require("./models/messages");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

let connectedUsers = [];

function addToConnectedUsers(userID, socket) {
  let connectedUser = findConnectedUser(userID);

  if (connectedUser) {
    connectedUser.sockets.push(socket);
    return;
  }

  connectedUsers.push({ userID, sockets: [socket] });
}

function findConnectedUser(userID) {
  return connectedUsers.find((user) => user.userID == userID);
}

const sessionMiddleware = session({
  secret: "mysecret",
  resave: true,
  saveUninitialized: true,
  credentials: true,
  name: "sid",
  cookie: {
    expires: Date.now() + 3600000,
  },
});

const server = express();

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use(sessionMiddleware);

serverHTTP = createServer(server);
const io = new Server(serverHTTP, {
  cors: { origin: "*", credentials: true },
});

io.use(
  sharedsession(sessionMiddleware, {
    autoSave: true,
  })
);

app.prepare().then(() => {
  io.on("connect", (socket) => {
    console.log("connected", socket.id);
    try {
      let userID = socket.handshake.session.user.id;
      if (userID) {
        addToConnectedUsers(userID, socket.id);
      }
    } catch (error) {
      console.log("user is not authorized yet");
    }

    socket.on("find-people", async (args) => {
      if (args.login.length === 0) return;
      let users = await userModel.findUsersByLogin(args.login);
      users = users.filter(
        (user) => user.id !== socket.handshake.session.user.id
      );

      socket.emit("find-people-response", users);
    });

    socket.on("send-friend-request", async (friendID) => {
      let contactRequest = await contactsModel.saveContactRequest(
        socket.handshake.session.user.id,
        friendID
      );

      if (contactRequest === "ERROR") return;

      let newFriendUser = findConnectedUser(friendID);
      if (newFriendUser) {
        let requester = await userModel.getUserByID(
          socket.handshake.session.user.id,
          ["id", "firstname", "lastname"]
        );
        newFriendUser.sockets.forEach((conn) => {
          io.to(conn).emit("new-friend-request", requester);
        });
      }
    });

    socket.on("accept-friend-request", async (requesterID) => {
      contactsModel.acceptContactRequset(
        socket.handshake.session.user.id,
        requesterID
      );
      let userConnections = findConnectedUser(socket.handshake.session.user.id);
      let requesterConnections = findConnectedUser(requesterID);
      if (userConnections) {
        let requester = await userModel.getUserByID(requesterID, [
          "id",
          "firstname",
          "lastname",
        ]);

        userConnections.sockets.forEach((conn) => {
          io.to(conn).emit("added-friend", requester);
        });
      }
      if (requesterConnections) {
        let user = await userModel.getUserByID(
          socket.handshake.session.user.id,
          ["id", "firstname", "lastname"]
        );

        requesterConnections.sockets.forEach((conn) => {
          io.to(conn).emit("added-friend", user);
        });
      }
    });

    socket.on("decline-friend-request", async (requesterID) => {
      await contactsModel.declineContactRequset(
        socket.handshake.session.user.id,
        requesterID
      );
    });

    socket.on("fetch-messages", async (friendID) => {
      let messages = await MessagesModel.findAll(
        socket.handshake.session.user.id,
        friendID
      );

      io.to(socket.id).emit("receive-messages", messages);
    });

    socket.on("send-message", async ({ friendID, messageText }) => {
      let newMessageID = await MessagesModel.saveMessage(
        socket.handshake.session.user.id,
        friendID,
        messageText
      );

      let newMessage = await MessagesModel.getMessageByID(newMessageID);

      let userConnections = findConnectedUser(socket.handshake.session.user.id);
      if (userConnections) {
        userConnections.sockets.forEach((conn) => {
          io.to(conn).emit("receive-new-message", newMessage);
        });
      }

      let friendConnections = findConnectedUser(friendID);
      if (friendConnections) {
        friendConnections.sockets.forEach((conn) => {
          io.to(conn).emit("receive-new-message", newMessage);
        });
      }
    });
  });

  server.get("/", (req, res) => {
    if (req.session.user) {
      return res.redirect("/home");
    } else {
      return handle(req, res);
    }
  });

  server.post("/signin", async (req, res) => {
    if (!req.session.user) {
      if (
        !(
          req.body.firstname === "" &&
          req.body.firstname.length > 0 &&
          req.body.firstname.length <= 100 &&
          req.body.lastname === "" &&
          req.body.lastname.length > 0 &&
          req.body.lastname.length <= 100 &&
          req.body.login === "" &&
          req.body.login.length > 0 &&
          req.body.login.length <= 25 &&
          req.body.password === "" &&
          req.body.password.length > 0 &&
          req.body.password.length <= 100
        )
      ) {
        let hashedPassword = await userModel.getHashedPassword(req.body.login);

        let isCorrectPassword = await bcrypt.compare(
          req.body.password,
          hashedPassword
        );

        if (!isCorrectPassword) {
          return res.send("Wrong username or password");
        }

        let user = {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          login: req.body.login,
          password: req.body.password,
        };

        let id = await userModel.getUserID(user);

        if (!(typeof id === "number")) {
          return res.send("Wrong username or password");
        }

        req.session.user = { id };
        req.session.save();
      } else {
        return res.send("something wrong");
      }
    }

    res.redirect("/home");
  });

  server.post("/signup", async (req, res) => {
    if (!req.session.user) {
      if (
        !(
          req.body.firstname === "" &&
          req.body.firstname.length > 0 &&
          req.body.firstname.length <= 100 &&
          req.body.lastname === "" &&
          req.body.lastname.length > 0 &&
          req.body.lastname.length <= 100 &&
          req.body.login === "" &&
          req.body.login.length > 0 &&
          req.body.login.length <= 25 &&
          req.body.password === "" &&
          req.body.password.length > 0 &&
          req.body.password.length <= 100
        )
      ) {
        let pass = await bcrypt
          .hash(req.body.password, 10)
          .then(function (hash) {
            return hash;
          });

        let user = {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          login: req.body.login,
          password: pass,
        };

        userModel.saveUser(user);

        let id = await userModel.getUserID(user);

        if (!(typeof id === "number")) {
          return res.send("Something went wrong");
        }

        req.session.user = { id };
        req.session.save();
      }
    }

    res.redirect("/home");
  });

  server.get("/home", async (req, res) => {
    let actualPage;
    let queryParams;
    if (!req.session.user) {
      actualPage = "/";
      app.render(req, res, actualPage, queryParams);
      return;
    } else {
      actualPage = "/home";
      queryParams = {
        ...req.session.user,
      };

      app.render(req, res, actualPage, queryParams);
    }
  });

  server.get("/contacts", async (req, res) => {
    let actualPage;
    let queryParams;

    if (!req.session.user) {
      actualPage = "/";
      return await app.render(req, res, actualPage, queryParams);
    } else {
      actualPage = "/contacts";
      queryParams = {
        ...req.session.user,
      };
      return await app.render(req, res, actualPage, queryParams);
    }
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  serverHTTP.listen(port, (err) => {
    if (err) throw err;
    connectToDB();
    console.log(`> Ready on http://localhost:${port}`);
  });
});
