import { Router } from "express";
import * as adminController from "./controller/index.js";
import * as rules from "./rules/index.js";
import { authenticate } from "#src/middleware/auth/index.js";
import validate from "#src/middleware/validation/index.js";

const router = Router();

router.post("/", authenticate, validate(rules.create), adminController.create);

router.get("/", authenticate, adminController.readAll);

router.get("/:id", authenticate, adminController.readOne);

router.put("/:id", authenticate, validate(rules.update), adminController.update);

router.delete("/:id", authenticate, adminController.destroy);

router.put("/:id/update-password", authenticate, adminController.updatePassword);

router.post("/signin", validate(rules.signin), adminController.signin);

router.post("/signout", authenticate, adminController.signout);

router.post("/request-password", adminController.requestPassword);

router.post("/reset-password", adminController.resetPassword);

export default router;
