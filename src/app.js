"use strict";

const express = require("express");
const routes = require("./routes");
const app = (module.exports = express());

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/v1", routes);
