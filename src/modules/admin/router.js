import { Router } from "express";
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

router.post("/", create);
router.get("/", fetchAll);
router.get("/:id", fetchOne);
router.put("/:id", update);
router.delete("/:id", remove);
router.post("/signin", signin);
router.post("/signout", signout);
router.post("/request-password", requestPassword);
router.post("/reset-password", resetPassword);

export default router;
