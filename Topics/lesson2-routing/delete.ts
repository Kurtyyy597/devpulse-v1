// const express = require("express");
// const cors = require("cors");

// const app = express();

// app.use(cors());
// app.use(express.json());

// const users = [];

// // GET
// app.get("/users", (req, res) => {
//   res.json(users);
// });

// // POST
// app.post("/users", (req, res) => {
//   const { name, age } = req.body;

//   if (!name || age === undefined) {
//     return res.status(400).json({
//       success: false,
//       message: "Name and age are required",
//     });
//   }

//   const newUser = {
//     id: Date.now().toString(),
//     name,
//     age,
//   };

//   users.push(newUser);

//   res.status(201).json({
//     success: true,
//     message: "User created successfully",
//     data: newUser,
//   });
// });

// // PUT
// app.put("/users/:id", (req, res) => {
//   const id = req.params.id;
//   const { name, age } = req.body;

//   const user = users.find((u) => u.id === id);

//   if (!user) {
//     return res.status(404).json({
//       success: false,
//       message: "User not found",
//     });
//   }

//   if (!name || age === undefined) {
//     return res.status(400).json({
//       success: false,
//       message: "Name and age are required",
//     });
//   }

//   user.name = name;
//   user.age = age;

//   res.json({
//     success: true,
//     message: "User updated successfully",
//     data: user,
//   });
// });

// // DELETE
// app.delete("/users/:id", (req, res) => {
//   const id = req.params.id;

//   const index = users.findIndex((u) => u.id === id);

//   if (index === -1) {
//     return res.status(404).json({
//       success: false,
//       message: "User not found",
//     });
//   }

//   const deletedUser = users.splice(index, 1)[0];

//   res.json({
//     success: true,
//     message: "User deleted successfully",
//     data: deletedUser,
//   });
// });

// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// });
