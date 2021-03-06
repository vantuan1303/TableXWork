const http = require("http");
const winston = require("winston");
const app = require("./app");
require("dotenv").config();
const database = require("./database");
const { PORT, HOST } = process.env;

const server = http.createServer(app);

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "./logs/weblog.log" })
  ]
});

database.connect().then(() => {
  server.on("error", error => {
    if (process.env.NODE_ENV === "production") {
      logger.log("error", error);
    }
  });

  server.listen(PORT, HOST, () => {
    if (process.env.NODE_ENV === "production") {
      logger.log("info", `Server is starting at ${new Date()}`);
    }
  });

  console.log(`Running on: ${HOST}:${PORT}`);
});
