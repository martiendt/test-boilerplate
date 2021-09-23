import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import {
  fetchAll as fetchAllAdmin,
  fetchOne as fetchOneAdmin,
} from "../../admin.model.js";
import { verifyPassword } from "./helper.js";
import { authAdminConfig } from "#src/config/auth.js";

/**
 * Authenticate admin using passport local strategy
 */
export function passportAdminLocal() {
  passport.use(
    "admin-local",
    new LocalStrategy({ session: false }, async (username, password, done) => {
      try {
        // search admin by username or email
        const result = await fetchAllAdmin(
          { filter: { ":or": [{ username: username }, { email: username }] } },
          { includeRestrictedFields: true }
        );

        // handle if admin doesn't exists
        const admin = result.data.length === 1 ? result.data[0] : undefined;
        if (admin === undefined) {
          return done(null, false);
        }

        // handle wrong password
        if (!verifyPassword(password, admin.password)) {
          return done(null, false);
        }

        // return admin
        done(null, admin);
      } catch (error) {
        done(error, false);
      }
    })
  );
}

/**
 * Authenticate admin using passport jwt strategy
 */
export function passportAdminJwt() {
  passport.use(
    "admin-jwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: authAdminConfig.secret,
      },
      async (payload, done) => {
        try {
          // payload.sub is admin_id from jwt token
          let admin = await fetchOneAdmin(payload.sub);

          done(null, Object.keys(admin).length > 0 ? admin : false);
        } catch (error) {
          done(error, false);
        }
      }
    )
  );
}
