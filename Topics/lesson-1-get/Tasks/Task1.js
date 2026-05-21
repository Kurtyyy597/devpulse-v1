
const express = require("express");
const app = express();

const name = "Kurt Allen A. Marquez";

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/hello", (req, res) => {
  res.send(`Hello, ${name}`);
});

app.get("/about", (req, res) => {
  res.send("This is my backend practice");
});

app.get("/time", (req, res) => {
  const time = new Date().toTimeString();
  res.send(`Current Time: ${time}`);
});

app.get("/status", (req, res) => {
  res.json({
    status: "Success",
    message: "API is working",
  });
});

app.listen(3000, () => {
  console.log("Backend testing");
});
