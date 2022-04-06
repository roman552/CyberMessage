const express = require("express");
const session = require("express-session");
const sharedsession = require("express-socket.io-session");

const bodyParser = require("body-parser");
const next = require("next");
const { createServer } = require("http");
const { Server } = require("socket.io");

const { connectToDB } = require("./database");
const { userModel } = require("./models/user");

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
  return connectedUsers.find((user) => user.userID === userID);
}

const sessionMiddleware = session({
  secret: "mysecret",
  resave: true,
  saveUninitialized: true,
  credentials: true,
  name: "sid",
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
      let user = await userModel.getUserByLogin(args.login);
      socket.emit("find-people-response", user);
    });

    socket.on("send-friend-request", async (friendID) => {
      // send request
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
        let user = {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          login: req.body.login,
          password: req.body.password,
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
      return app.render(req, res, actualPage, queryParams);
    } else {
      actualPage = "/home";
      queryParams = {
        ...req.session.user,
        contacts: await userModel.getUserContactsByID(req.session.user.id),
      };

      return app.render(req, res, actualPage, queryParams);
    }
  });

  server.get("/contacts", async (req, res) => {
    let actualPage;
    let queryParams;

    if (!req.session.user) {
      actualPage = "/";
      return app.render(req, res, actualPage, queryParams);
    } else {
      actualPage = "/contacts";
      queryParams = {
        ...req.session.user,
        contacts: await userModel.getUserContactsByID(req.session.user.id),
      };
      return app.render(req, res, actualPage, queryParams);
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
