"use strict";

const router = require("express").Router();

const session = require("./session");
const search = require("./search");

router.use("/session", session);
router.use("/search", search);

module.exports = router;
