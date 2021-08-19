import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { authAdminConfig } from "#src/config/auth.js";
import {
  fetchAll as fetchAllAdmin,
  fetchOne as fetchOneAdmin,
  verifyPassword as verifyPasswordAdmin,
} from "#src/modules/admin/admin.model.js";

passport.use(
  "jwt-admin",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authAdminConfig.secret,
    },
    async (payload, done) => {
      try {
        // find user from token
        let admin = await fetchOneAdmin(payload.sub);

        done(null, admin ?? false);
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
      session: false,
    },
    async (username, password, done) => {
      console.log("test");
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
        if (admin.data.length === 0) {
          return done(null, false);
        }
        // handle wrong password
        if (!(await verifyPasswordAdmin(password, admin.data[0].password))) {
          return done(null, false);
        }
        // return admin
        done(null, admin.data[0]);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
