const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/about", (req, res) => {
  res.send("About is running")
});

app.listen(8000, () => {
  console.log("Server running on port 3000");
  console.log("someone visited homepage");
});