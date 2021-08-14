import passport from "passport";

export const authAdminLocal = passport.authenticate("local-admin", {
  failWithError: true,
  session: false,
});

export const authAdminJwt = passport.authenticate("jwt-admin", {
  failWithError: true,
  session: false,
});

export const authUserLocal = passport.authenticate("local-user", {
  failWithError: true,
  session: false,
});

export const authUserJwt = passport.authenticate("jwt-user", {
  failWithError: true,
  session: false,
});
