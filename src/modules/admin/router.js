import { Router } from "express";
import * as adminController from "./controller/index.js";
import rulesCreate from "./rules/create.js";
import { authAdminLocal, authAdminJwt } from "#src/middleware/auth/index.js";
import validation from "#src/middleware/validation/index.js";

const router = Router();

router.post(
  "/",
  authAdminJwt(),
  validation(rulesCreate),
  adminController.create
);
router.get("/", authAdminJwt(), adminController.fetchAll);
router.get("/:id", authAdminJwt(), adminController.fetchOne);
router.put("/:id", authAdminJwt(), adminController.update);
router.delete("/:id", authAdminJwt(), adminController.remove);
router.post("/signin", authAdminLocal(), adminController.signin);
router.post("/signout", adminController.signout);
router.post("/request-password", adminController.requestPassword);
router.post("/reset-password", adminController.resetPassword);

export default router;
