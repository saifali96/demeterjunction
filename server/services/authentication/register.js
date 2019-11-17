const User = require("../../models/User");

// HTTP response objects
const httpMessages = {
  onValidateError: {
    success: false,
    message: "Please enter email and password."
  },
  onUserSaveError: {
    success: false,
    message: "That email address already exists."
  },
  onUserSaveSuccess: {
    success: true,
    message: "Successfully created new user."
  }
};

// Register new users
function registerUser(request, response) {
  const {
    email,
    password,
    role,
    fname,
    lname,
    gender,
    practice,
    avatar
  } = request.body;
  if (!email || !password) {
    response.json(httpMessages.onValidateError);
  } else {
    const newUser = new User({
      email,
      password,
      role,
      fname,
      lname,
      gender,
      practice,
      avatar
    });
    // Attempt to save the user
    newUser.save(error => {
      if (error) {
        return response.json(httpMessages.onUserSaveError);
      }
      response.json(httpMessages.onUserSaveSuccess);
    });
  }
}

module.exports = {
  registerUser
};
