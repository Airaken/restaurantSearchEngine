"use strict";

const { Router } = require("express");

const db = require("../../utils/mongoDB");
const { ObjectId } = require("mongodb");
// const bcrypt = require("bcrypt");
const { tokenValidator } = require("../../utils/auth");

const router = Router();

router.post("/", async (req, res) => {
  const { email, pass } = req.body;
  let user = null;

  try {
    const userFound = await db.collection("users").findOne({ email: email });
    if (userFound) {
      return res
        .status(404)
        .json({ ok: false, message: `user ${email} has an acount.` });
    }

    const userId = await db.collection("users").insertOne({
      email: email,
      // pass: bcrypt.hashSync(pass, bcrypt.genSaltSync(10)),
      pass: pass,
    }).insertedId;

    user = await db.collection("users").findOne({ _id: ObjectId(userId) });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      ok: false,
      err,
    });
  }

  res.json({
    ok: true,
    user: user,
  });
});

router.get("/:id", tokenValidator, async (req, res) => {
  const { id } = req.query;

  let user = null;

  try {
    user = await db.collection("users").findOne({ _id: ObjectId(id) });
    if (!user) {
      throw new Error("User not found");
    }
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      ok: false,
      err: err.message,
      error: Error(err),
    });
  }

  res.json({
    ok: true,
    user: user,
  });
});

module.exports = router;
