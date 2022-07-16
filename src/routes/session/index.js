const express = require("express");
const app = express();
const db = require("../../utils/mongoDB");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

app.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  let token = null;
  try {
    const user = await db.collection("users").findOne({ email: email });

    if (!user || user.pass !== pass) {
      throw new Error("email or password incorrect");
    }

    token = jwt.sign(
      {
        ok: true,
        user: user.email,
      },
      process.env.SEED,
      { expiresIn: 10000 }
    );

    await db.collection("tokens").insertOne({ user: email, token: token });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      ok: false,
      err,
    });
  }

  res.json({
    ok: true,
    token,
  });
});

app.post("/logout", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await db.collection("users").findOne({ email: email });

    if (!user) {
      throw new Error("user not found");
    }

    await db
      .collection("tokens")
      .findOneAndUpdate({ user: user.email }, { token: "" });
  } catch (err) {
    return res.status(400).json({
      ok: false,
      err,
    });
  }

  res.json({
    ok: true,
    user: user,
    token,
  });
});

module.exports = app;
