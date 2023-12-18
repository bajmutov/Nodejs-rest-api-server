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
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
} = require("../../controllers/authController");
const authenticate = require("../../middleWarres/authenticate");
const upload = require("../../middleWarres/upload");

const router = express.Router();

router.post(
  "/register",
  validation(schemas.registerSchema),
  ctrlWrapper(register)
);

router.get("/verify/:verificationToken", ctrlWrapper(verifyEmail));

router.post(
  "/verify",
  validation(schemas.emailSchema),
  ctrlWrapper(resendVerifyEmail)
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

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(updateAvatar)
);

module.exports = router;
