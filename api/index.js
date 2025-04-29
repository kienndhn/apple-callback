const express = require("express");
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

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
