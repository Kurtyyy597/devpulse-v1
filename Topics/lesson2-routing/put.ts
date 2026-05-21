// const express = require("express");
// const app = express();

// app.use(express.json());


// const users = [];

// app.get("/users", (req, res) => {
//   res.status(200).json(users);
// });


// app.post("/users", (req, res) => {
//   const {name, age} = req.body;

//   if (!name || !age) {
//     return res.status(400).json({
//       message: "Name and age are required"
//     });
//   };

//   const newUser = {
//     id: Date.now().toString(),
//     name,
//     age
//   };

//   users.push(newUser);

//   res.status(201).json({
//     message: "User created successfully",
//     newUser: newUser
//   });
// });

// app.put("/users/:id", (req, res) => {
//   const id = req.params.id;
//   const {name, age} = req.body;

//   const user = users.find((u) => u.id === id);

//   if (!user) {
//     return res.status(404).json({
//       message: "User not found"
//     });
//   };

//   console.log("PARAM ID:", req.params.id);
//   console.log("USERS:", users);

//   if (!name || !age) {
//     return res.status(400).json({
//       message: "Name and age are required"
//     });
//   };

//   user.name = name;
//   user.age = age;

//   res.status(200).json({
//     message: "User updated successfully",
//     updatedUser: user
//   })
// });



// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// });