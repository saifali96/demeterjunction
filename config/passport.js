const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");

const User = require("../server/models/User");
const config = require("./db");

function setPassportConfigs(passport) {
  const opts = {};

  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = config.secret;
  passport.use(
    new JwtStrategy(opts, (jwtPayload, done) => {
      User.findOne({ id: jwtPayload.id }, (err, user) => {
        if (err) {
          return done(err, false);
        }

        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
    })
  );
}

module.exports = setPassportConfigs;
