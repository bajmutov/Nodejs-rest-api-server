const express = require("express");
const router = express.Router();
const {
  ctrlListContacts,
  ctrlGetById,
  ctrlAddContact,
  ctrlUpdateContact,
  ctrlRemoveContact,
} = require("../../controllers/contactsController");

router.get("/", ctrlListContacts);

router.get("/:contactId", ctrlGetById);

router.post("/", ctrlAddContact);

router.put("/:contactId", ctrlUpdateContact);

router.delete("/:contactId", ctrlRemoveContact);

module.exports = router;
