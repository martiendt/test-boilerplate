const express = require("express");

const router = express.Router();
const controller = require("./controller");

router.post("/create", controller.create);
router.get("/", controller.fetchAll);
router.get("/:id", controller.fetchOne);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);
router.post("/signin", controller.signin);
router.post("/signout", controller.signout);
router.post("/request-password", controller.requestPassword);
router.post("/reset-password", controller.resetPassword);

module.exports = router;
