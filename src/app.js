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
    // this users represents the array of users
    const users = await User.find({ emailId: userEmail });

    // if there are no users with the given emailId, then send 404 status code
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

    // if there are no users with the given emailId, then send 404 status code
    if (!users) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went Wrong");
  }
});

// delete the user from the database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    //const user = await User.findByIdAndDelete(_id:userId);
    const user = await User.findByIdAndDelete(userId);

    res.send("User deleted successfully");
  } catch (err) {
    res
      .status(400)
      .send("Something went wrong while deleting the user: " + err.message);
  }
});

// update the user in the database by id

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];

    const isUpdateAllowed = Object.keys(data).every((key) =>
      ALLOWED_UPDATES.includes(key)
    ); // check if the keys in the data object are allowed to be updated
    if (!isUpdateAllowed) {
      // if not, then send 400 status code
      throw new Error("Update Not Allowed");
    }

    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }
    await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true, // this is true for update validation
    });

    res.send("User updated successfully");
  } catch (err) {
    res
      .status(400)
      .send("Something went wrong while updating the user: " + err.message);
  }
});

// update the user in the database by email

app.patch("/user", async (req, res) => {
  const userEmail = req.body.userEmailmail; // client se email le rahe hain
  const data = req.body; // updated data bhi client se aa raha hai

  try {
    await User.findOneAndUpdate({ emailId: userEmail }, data);

    res.send("User updated successfully via email");
  } catch (err) {
    res
      .status(400)
      .send("Something went wrong while updating user: " + err.message);
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
