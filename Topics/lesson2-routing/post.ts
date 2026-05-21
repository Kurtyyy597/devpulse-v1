const express = require("express");
const app = express();

app.use(express.json());


app.get("/", () => {
  console.log("App is running");
});


//Post Route
app.post("/user", (req, res) => {
  const user = req.body;

  if (!user.name && !user.age) {
    res.status(400).json({
      message: "Invalid input"
    });
  };

  res.status(201).json({
    message: "User created",
    user: user,
    name: user.name,
    age: user.age
  });
});

app.listen(3000, () => {
  console.log("Post backend worked");
});