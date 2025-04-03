const express = require("express");

const app = express();

app.get("/getUserData", (req, res) => {
  //try {
  throw new Error("dvdhdjsjasj");
  res.send("User Data sent");
  // } catch (err) {
  //   res.status(500).send("Internal Server Error: ");
  // }
});

// error handling middleware
// This middleware will catch any errors that are thrown in the routes or other middleware
app.use("/", (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong: " + err.message);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
