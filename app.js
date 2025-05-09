const express = require("express");
const serverless = require("serverless-http");
const app = express();

app.use(express.json());

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

module.exports = serverless(app);
