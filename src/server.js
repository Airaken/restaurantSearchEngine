"use strict";

require("dotenv").config();

const {
  PORT = 4000,
  MONGODB_STRING = "mongodb://mongo",
  DATABASE = "restaurantSearchEngine",
} = process.env;
const app = require("./app");
const db = require("./utils/mongoDB");
let ready = false;

/**
 * health check for get the status of the server
 */
app.get("/checks/health", (req, res) => {
  if (!ready) res.status(503).json({ status: "fail" });
  res.status(200).json({ status: "ok" });
});

db.connect({ uri: MONGODB_STRING, database: DATABASE })
  .then(() => {
    console.log(`Mongo connected`);
    app.listen(PORT, () => {
      console.log(`Listen on port: ${PORT}`);
    });
    ready = true;
  })
  .catch((err) => console.error(err));
