import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { authAdminConfig } from "#src/config/auth.js";

export function passportAdminLocal(fetchAllAdmin, verifyPassword) {
  passport.use(
    "admin-local",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        session: false,
      },
      async (username, password, done) => {
        try {
          // find correct admin
          // return empty array when username not found
          const result = await fetchAllAdmin(
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
          const admin = result.data.length === 1 ? result.data[0] : undefined;

          if (result.data.length === 0) {
            return done(null, false);
          }
          // handle wrong password
          if (!(await verifyPassword(password, admin.password))) {
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
}

export function passportAdminJwt(fetchOneAdmin) {
  passport.use(
    "admin-jwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: authAdminConfig.secret,
      },
      async (payload, done) => {
        try {
          // find user from token
          let admin = await fetchOneAdmin(payload.sub);
          console.log(admin);
          done(null, admin ?? false);
        } catch (error) {
          done(error, false);
        }
      }
    )
  );
}
