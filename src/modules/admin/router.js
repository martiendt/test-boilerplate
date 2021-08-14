import { Router } from "express";
import { authAdminLocal } from "../../utils/auth.js";
import {
  create,
  fetchAll,
  fetchOne,
  update,
  remove,
  signin,
  signout,
  requestPassword,
  resetPassword,
} from "./controller/index.js";

const router = Router();

// Caller function for global error handling
// Route all calls through this to try hand handle error
// https://www.youtube.com/watch?v=s5YoXms0ECs
const use = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch((e) => next(e));

router.post("/", create);
router.get("/", fetchAll);
router.get("/:id", fetchOne);
router.put("/:id", update);
router.delete("/:id", remove);
router.post("/signin", authAdminLocal, signin);
router.post("/signout", signout);
router.post("/request-password", requestPassword);
router.post("/reset-password", resetPassword);

export default router;
