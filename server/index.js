/* eslint-disable func-names */
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");

module.exports = function() {
  const server = express();

  const create = function(config, db) {
    const routes = require("./routes");
    // Server settings
    server.set("env", config.env);
    server.set("port", config.port);
    server.set("hostname", config.hostname);

    // Networking Middleware
    const whiteList = [
      "https://biteport-dev.herokuapp.com/",
      "http://localhost:3000"
    ];
    server.use(helmet());
    server.use(
      cors({
        origin(origin, callback) {
          if (whiteList.indexOf(origin) === -1 && origin) {
            console.log(origin);
            return callback(new Error(11)); // ERR CODE 11 : CORS CHECK FAIL
          }
          return callback(null, true);
        },
        allowedHeaders: "Content-Type,Authorization"
      })
    );

    // Error handler
    server.use((err, request, response, next) => {
      // console.error(err.stack)
      switch (err.message) {
        case "11": // for CORS()
          response.status(403).send("Invalid request.");
          break;
        default:
          break;
      }
    });

    // Compression middleware
    server.use(compression());

    // Middleware requests parsers
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(cookieParser());
    server.use(logger("dev"));
    server.use(passport.initialize());
    mongoose.connect(db.database, {
      useNewUrlParser: true,
      useCreateIndex: true
    });
    require("../config/passport")(passport);

    // Setup routes
    routes.init(server);
  };

  const start = function() {
    const hostname = server.get("hostname");
    const port = server.get("port");

    server.listen(port, () => {
      console.log(`Express server listening on - https://${hostname}:${port}`);
    });
  };

  return {
    create,
    start
  };
};
