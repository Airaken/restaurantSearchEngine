"use strict";

const router = require("express").Router();

const session = require("./session");
const search = require("./search");
const users = require("./users");

router.use("/session", session);
router.use("/search", search);
router.use("/users", users);

module.exports = router;
