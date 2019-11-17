const decoder = require("jwt-decode");
const User = require("../../models/User");

// HTTP response objects
const httpResponse = {
  onUserNotFound: {
    success: false,
    message: "User not found."
  },
  onUnexpectedError: {
    success: false,
    message: "Something went wrong while fetching user details."
  }
};

function getDashboard(request, response) {
  const token = getToken(request.headers);
  const u = decoder(token);
  if (u.uid && u.uType) {
    User.findOne(
      {
        _id: u.uid,
        role: u.uType
      },
      {
        id: 1,
        email: 1,
        gender: 1,
        fname: 1,
        lname: 1,
        avatar: 1
      },
      (err, user) => {
        if (err) {
          return response.status(400).send(httpResponse.onUnexpectedError);
        }
        if (!user) {
          return response.status(400).send(httpResponse.onUserNotFound);
        }
        return response.send({
          success: true,
          message: user
        });
      }
    );
  } else {
    return response.status(400).send(httpResponse.onUnexpectedError);
  }
  // // dashboard - TODO add more details
  // response.json('This is the dashboard.');
}

module.exports = { getDashboard };
