const jwt = require("jsonwebtoken");
const Validator = require("validator");
const db = require("../../../config/db");
const User = require("../../models/User");

// HTTP response objects
const httpResponse = {
  onUserNotFound: {
    success: false,
    message: "User not found."
  },
  onAuthenticationFail: {
    success: false,
    message: "Password is not correct"
  },
  onUnexpectedError: {
    success: false,
    message: "Unexpected error occurred while logging in user."
  },
  onTokenCreationError: {
    success: false,
    message: "Error in creating your token."
  },
  onEmailValidationError: {
    success: false,
    message: "E-mail is required or invalid."
  },
  onPasswordValidationError: {
    success: false,
    message: "Password is required or invalid."
  },
  onUserDisabled: {
    success: false,
    message: "User is Disabled."
  },
  onBadRequest: {
    success: false,
    message: "Bad request"
  }
};

function loginUser(request, response) {
  if (request.method !== "POST") {
    return response.status(403).send(httpResponse.onBadRequest);
  }

  if (!Validator.isEmail(request.body.email.toString().trim())) {
    return response.status(400).send(httpResponse.onEmailValidationError);
  }

  User.findOne(
    {
      email: request.body.email.toString().trim()
      // eslint-disable-next-line consistent-return
    },
    {
      id: 1,
      role: 1,
      password: 1
    },
    (error, user) => {
      if (error) {
        return response.status(400).send(httpResponse.onUnexpectedError);
      }
      if (!user) {
        return response.status(400).send(httpResponse.onUserNotFound);
      }
      if (user.isDisabled) {
        return response.status(400).send(httpResponse.onUserDisabled);
      }
      // Check if password matches
      // eslint-disable-next-line consistent-return
      user.comparePassword(
        request.body.password.toString().trim(),
        (nexterror, isMatch) => {
          if (isMatch && !nexterror) {
            const payload = {
              uid: user.id,
              uType: user.role
            };
            const privateKEY = db.secret;
            const signOptions = {
              expiresIn: "48h",
              algorithm: "HS512"
            };
            jwt.sign(payload, privateKEY, signOptions, (tokenError, token) => {
              if (tokenError) {
                return response
                  .status(400)
                  .send(httpResponse.onTokenCreationError);
              }
              return response.send({
                success: true,
                message: `JWT ${token}`
              });
            });
          } else {
            return response.status(401).send(httpResponse.onAuthenticationFail);
          }
        }
      );
    }
  );
}

module.exports = {
  loginUser
};
