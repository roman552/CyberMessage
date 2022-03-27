const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const next = require("next");
const { createServer } = require("http");
const { Server } = require("socket.io");

const { userModel } = require("./models/user");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(
    session({
      secret: "mysecret",
      saveUninitialized: true,
      resave: true,
    })
  );

  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());

  serverHTTP = createServer(server);
  const io = new Server({ cors: { origin: "*" } }).listen(serverHTTP);

  io.on("connect", (socket) => {
    console.log("connected", socket.id);
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
      }
    }

    res.redirect("/home");
  });

  server.get("/home", (req, res) => {
    if (!req.session.user) {
      res.send("not allowed! please sign in.");
    } else {
      const actualPage = "/home";
      const queryParams = req.session.user;
      app.render(req, res, actualPage, queryParams);
    }
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  serverHTTP.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
