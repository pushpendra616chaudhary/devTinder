const express = require("express");

const connectDB = require("./config/database");

const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  // Creating a new instance of the User Model
  const user = new User({
    firstName: "Pushpendra",
    lastName: "Singh",
    emailId: "pushpendra616singh@gmail.com",
    password: "kunal@123#",
  });

  // Saving the user to the database
  // The save method returns a promise, so we can use async/await or .then/.catch to handle the result
  // or error
  try {
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connectiom established...");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected");
  });
