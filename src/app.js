const express = require("express");

const connectDB = require("./config/database");

const app = express();
const User = require("./models/user");

app.use(express.json()); // Middleware to parse JSON bodies

app.post("/signup", async (req, res) => {
  // Creating a new instance of the User Model
  // const user = new User({
  //   firstName: "Mahima",
  //   lastName: "Sahu",
  //   emailId: "mahima_SAHUh@gmail.com",
  //   password: "MAHI123#",
  // });

  const user = new User(req.body); // Using the request body to create a new user
  // The request body should contain the user data in JSON format
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

// Get user by emailId

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const users = await User.find({ emailId: userEmail });

    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went Wrong");
  }
});

// Feed ApI - get all users from the database
// This API will be used to get all users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// get the user by mail if there are multiple users with the same emailId

app.get("/user1", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const users = await User.findOne({ emailId: userEmail });
    if (!users) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went Wrong");
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
