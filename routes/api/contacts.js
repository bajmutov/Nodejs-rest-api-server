const express = require("express");
const router = express.Router();
const validation = require("../../middleWarres/validation");
const contactSchema = require("../../schemas/contactSchema");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const {
  ctrlListContacts,
  ctrlGetById,
  ctrlAddContact,
  ctrlUpdateContact,
  ctrlRemoveContact,
} = require("../../controllers/contactsController");

router.get("/", ctrlWrapper(ctrlListContacts));

router.get("/:contactId", ctrlWrapper(ctrlGetById));

router.post("/", validation(contactSchema), ctrlWrapper(ctrlAddContact));

router.put(
  "/:contactId",
  validation(contactSchema),
  ctrlWrapper(ctrlUpdateContact)
);

router.delete("/:contactId", ctrlWrapper(ctrlRemoveContact));

module.exports = router;
