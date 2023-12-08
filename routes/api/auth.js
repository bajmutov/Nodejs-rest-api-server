const express = require("express");
const { schemas } = require("../../models/users");
const validation = require("../../middleWarres/validation");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
} = require("../../controllers/authController");
const authenticate = require("../../middleWarres/authenticate");

const router = express.Router();

router.post(
  "/register",
  validation(schemas.registerSchema),
  ctrlWrapper(register)
);

router.post("/login", validation(schemas.loginSchema), ctrlWrapper(login));

router.get("/current", authenticate, ctrlWrapper(getCurrent));

router.post("/logout", authenticate, ctrlWrapper(logout));

router.patch(
  "/",
  authenticate,
  validation(schemas.updateSubscriptionSchema),
  ctrlWrapper(updateSubscription)
);

module.exports = router;
