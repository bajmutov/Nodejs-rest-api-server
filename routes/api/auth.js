const express = require("express");

// const ctrl = require("../../controllers/authController");

// const { validateBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/users");
const validation = require("../../middleWarres/validation");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const { register, login } = require("../../controllers/authController");

const router = express.Router();

router.post(
  "/register",
  validation(schemas.registerSchema),
  ctrlWrapper(register)
);

router.post("/login", validation(schemas.loginSchema), ctrlWrapper(login));

// router.get("/current", authenticate, ctrl.getCurrent);

// router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
