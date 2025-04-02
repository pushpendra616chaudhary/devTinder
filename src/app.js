const express = require("express");

const app = express();

// app.use("/hello", (req, res) => {
//   res.send("Hello Hello Heloo");
// });

// // it wont work because of the previous middleware
// // app.use("/hello/2", (req, res) => {
// //   res.send("hi hi hi hi ");
// // });

// app.use("/bye", (req, res) => {
//   res.send("bye");
// });

app.get("/user", (req, res) => {
  res.send({ firstnname: "John", lastname: "Doe" });
});

app.post("/user", (req, res) => {
  console.log("Save Data to the database");
  res.send("Data successfully saved to the database");
});

app.delete("/user", (req, res) => {
  res.send("Deleted user");
});

app.use("/test", (req, res) => {
  res.send("Hello from the server");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
