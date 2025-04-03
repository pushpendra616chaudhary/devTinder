const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth.js");

app.use("/admin", adminAuth); // This middleware will be executed for all routes starting with /admin

//second way of adding middleware
app.get("/user", userAuth, (req, res) => {
  res.send("user Data Sent");
});
app.get("/admin/getAllData", (req, res) => {
  res.send("All data Sent");
});
app.get("/admin/deleteUser", (req, res) => {
  // Handle Auth middleware for all the GET, POST, PUT, DELETE requests
  app.use("/admin", (req, res, next) => {
    console.log("Admin Auth is getting checked");
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if (isAdminAuthorized) {
      next();
    } else {
      res.status(401).send("Unauthorized access");
    }
  });
  res.send("Deleted the user");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
