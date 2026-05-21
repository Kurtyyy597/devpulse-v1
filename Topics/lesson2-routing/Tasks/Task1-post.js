const express = require("express");
const app = express();

app.use(express.json());



app.get("/", (req, res) => {
  res.status(200).send("App is running");
});


app.post("/user", (req, res) => {
  const user = req.body;

  if (!user.age || !user.name) {
    return res.status(400).json({
      message: "Name and age are required"
    });
  }
  res.status(201).json({
    message: "User created successfully",
    data: user
  });
});

app.get("/user", (req, res) => {
  res.send("user is running")
})

app.listen(3000, () => {
  console.log(`Server running port on 3000`);
});