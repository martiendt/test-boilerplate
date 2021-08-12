const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { authUserConfig } = require("../config/auth");
const User = require("../module/users/services");
const bcrypt = require("bcrypt");

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authUserConfig.secret,
    },
    async (payload, done) => {
      try {
        // find user token
        const user = await User.find(payload.sub);
        // handle if user doens't exists
        if (!user) {
          return done(null, false);
        }
        // return user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        // find correct user
        // return empty array when username not found
        const user = await Auth.get({
          filter: {
            email: username,
          },
        });
        // handle if user doesn't exists
        if (user.length === 0) {
          return done(null, false);
        }
        // handle wrong password
        const isPasswordMatch = await bcrypt.compare(
          password,
          user[0].password
        );
        if (!isPasswordMatch) {
          return done(null, false);
        }
        // return user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
