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

router.get("/", ctrlWrapper(ctrlListContacts));

router.get("/:contactId", isValidId, ctrlWrapper(ctrlGetById));

router.post("/", ctrlWrapper(ctrlAddContact));

router.put(
  "/:contactId",
  isValidId,
  validation(schemas.addSchema),
  ctrlWrapper(ctrlUpdateContact)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validation(schemas.updateFavouriteSchema),
  ctrlWrapper(ctrlUpdateStatusContact)
);

router.delete("/:contactId", isValidId, ctrlWrapper(ctrlRemoveContact));

module.exports = router;
