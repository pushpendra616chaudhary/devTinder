const express = require("express");

const app = express();

app.use(
  "/user",
  (req, res, next) => {
    // first route handlerr
    console.log("Handling the route User !!");
    res.send("Hello from user route1");
    next(); // call the next middleware or route handler
    // now this will not be executed because we have already sent a response,it will goes to next route handler but give error, it will throw an error,because we are trying to send a response again in the next middleware, becouse Express does not allow sending multiple responses for a single request, leading to this error:
  },
  // second route handler
  (req, res) => {
    console.log("Handling the route user 2nd !!");
    res.send("Hello from user route2");
  }
);

// Control Returns to the First Middleware (after next()):

// JavaScript event loop resumes execution from the next line.

// res.send("Hello from user route11") tries to execute.

// BUT RESPONSE IS ALREADY SENT! → ❌ Error: "Cannot set headers after they are sent to the client".
app.use(
  "/user1",
  (req, res, next) => {
    // first route handlerr
    console.log("Handling the route User !!");

    next(); // call the next middleware or route handler
    res.send("Hello from user route11");
  },
  // second route handler
  (req, res) => {
    console.log("Handling the route user 2nd !!");
    res.send("Hello from user route22");
  }
);

app.get(
  "/user",
  (req, res, next) => {
    console.log("Handling the router user 1st !!");
    next();
  },
  (req, res, next) => {
    console.log("Handling the router user 2nd !!");
    //res.send("Hello from user route2");
    next();
  },
  (req, res, next) => {
    console.log("Handling the router user 3rd !!");
    // res.send("Hello from user route3");
    next();
  },
  (req, res, next) => {
    console.log("Handling the router user 4th !!");
    //res.send("Hello from user route4");
    next();
  },
  (req, res, next) => {
    console.log("Handling the router user 5th !!");
    res.send("Hello from user route5");
  }
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
