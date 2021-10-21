import { Router } from "express";
import rateLimit from "express-rate-limit";
import MongoStore from "rate-limit-mongo";
import * as adminController from "./controller/index.js";
import * as rules from "./rules/index.js";
import { authenticate } from "#src/middleware/auth/index.js";
import validate from "#src/middleware/validation/index.js";

const apiLimiter = rateLimit({
  store: new MongoStore({
    uri: "mongodb://127.0.0.1:27017/rate-limit",
    user: "",
    password: "",
    // should match windowMs
    expireTimeMs: 15 * 60 * 1000,
    errorHandler: console.error.bind(null, "rate-limit-mongo"),
    // see Configuration section for more options and details
    collectionName: "rate-limitter",
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
});

const router = Router();

router.post("/", authenticate, validate(rules.create), adminController.create);

router.get("/", apiLimiter, authenticate, adminController.readAll);

router.get("/:id", authenticate, adminController.readOne);

router.put("/:id", authenticate, validate(rules.update), adminController.update);

router.delete("/:id", authenticate, adminController.destroy);

router.put("/:id/update-password", authenticate, adminController.updatePassword);

router.post("/signin", validate(rules.signin), adminController.signin);

router.post("/signout", authenticate, adminController.signout);

router.post("/request-password", adminController.requestPassword);

router.post("/reset-password", adminController.resetPassword);

export default router;
