const express = require("express");
const router = express.Router();
const validation = require("../../middleWarres/validation");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const { schemas } = require("../../models/contacts");
const isValidId = require("../../middleWarres/isValidId");
const {
  ctrlListContacts,
  ctrlGetById,
  ctrlAddContact,
  ctrlUpdateContact,
  ctrlRemoveContact,
  ctrlUpdateStatusContact,
} = require("../../controllers/contactsController");
const authenticate = require("../../middleWarres/authenticate");

router.get("/", authenticate, ctrlWrapper(ctrlListContacts));

router.get("/:contactId", authenticate, isValidId, ctrlWrapper(ctrlGetById));

router.post(
  "/",
  authenticate,
  validation(schemas.addSchema),
  ctrlWrapper(ctrlAddContact)
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validation(schemas.addSchema),
  ctrlWrapper(ctrlUpdateContact)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validation(schemas.updateFavouriteSchema),
  ctrlWrapper(ctrlUpdateStatusContact)
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  ctrlWrapper(ctrlRemoveContact)
);

module.exports = router;
