const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function generateClientSecret() {
  const now = Math.floor(Date.now() / 1000);
  const claims = {
    iss: appleConfig.teamId,
    iat: now,
    exp: now + 60 * 5, // 5 minutes
    aud: "https://appleid.apple.com",
    sub: appleConfig.clientId,
  };

  const header = {
    alg: "ES256",
    kid: appleConfig.keyId,
  };

  return jwt.sign(claims, privateKey, { algorithm: "ES256", header });
}

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.get("/apple/callback", async (req, res) => {
  try {
    res.json({ success: true, user: "Hello world" });
  } catch (err) {
    console.error("Error exchanging token:", err.response?.data || err.message);
    res.status(500).send("Apple sign in failed");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
