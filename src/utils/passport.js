import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { authAdminConfig } from "../config/auth.js";
import { compare } from "bcrypt";
import {
  fetchAll as fetchAllAdmin,
  restrictedFields as restrictedFieldsAdmin,
} from "../modules/admin/admins.model.js";

passport.use(
  "jwt-admin",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authAdminConfig.secret,
    },
    async (payload, done) => {
      try {
        // find user token
        const user = await find(payload.sub);
        // handle if user doesn't exists
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
  "local-admin",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        // find correct admin
        // return empty array when username not found
        let admin = await fetchAllAdmin(
          {
            filter: {
              email: username,
            },
          },
          {
            includeRestrictedFields: true,
          }
        );
        // handle if admin doesn't exists
        if (admin.length === 0) {
          return done(null, false);
        }
        // handle wrong password
        admin = admin.data[0];
        const isPasswordMatch = await compare(password, admin.password);
        if (!isPasswordMatch) {
          return done(null, false);
        }
        // return admin
        done(null, admin);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
