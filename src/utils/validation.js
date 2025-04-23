const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  } else if (password.length < 8) {
    throw new Error("Password should be at least 8 characters long");
  } else if (!validator.isAlpha(firstName)) {
    throw new Error("First name should only contain alphabets");
  } else if (!validator.isAlpha(lastName)) {
    throw new Error("Last name should only contain alphabets");
  } else if (firstName.length < 3 || lastName.length < 3) {
    throw new Error(
      "First name and last name should be at least 3 characters long"
    );
  } else if (firstName.length > 50 || lastName.length > 50) {
    throw new Error(
      "First name and last name should be at most 50 characters long"
    );
  }
};

module.exports = {
  validateSignUpData,
};
