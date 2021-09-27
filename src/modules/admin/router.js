import { Router } from "express";
import * as adminController from "./controller/index.js";
import { authAdminLocal, authAdminJwt } from "./middleware/auth/index.js";
import {
  passportAdminLocal,
  passportAdminJwt,
} from "./middleware/auth/passport.js";
import rulesCreate from "./rules/create.js";
import validation from "#src/middleware/validation/index.js";

/**
 * Import Passport for protecting routes
 */
passportAdminLocal();
passportAdminJwt();

const router = Router();

router.post("/", validation(rulesCreate), adminController.create);

router.get("/", authAdminJwt(), adminController.readAll);

router.get("/:id", authAdminJwt(), adminController.readOne);

router.put("/:id", authAdminJwt(), adminController.update);

router.delete("/:id", authAdminJwt(), adminController.destroy);

router.post("/signin", authAdminLocal(), adminController.signin);

router.post("/signout", adminController.signout);

router.post("/request-password", adminController.requestPassword);

router.post("/reset-password", adminController.resetPassword);

export default router;
