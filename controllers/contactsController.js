const contactOperations = require("../models/contacts");
const createError = require("http-errors");

const ctrlListContacts = async (_, res) => {
  const contacts = await contactOperations.listContacts();
  res.json(contacts);
};

const ctrlGetById = async (req, res) => {
  const { contactId } = req.params;
  const contactById = await contactOperations.getById(contactId);
  if (!contactById) {
    throw createError(404, "Not found");
  }
  res.json(contactById);
};

const ctrlAddContact = async (req, res) => {
  const newContact = await contactOperations.addContact(req.body);
  res.status(201).json(newContact);
};

const ctrlUpdateContact = async (req, res) => {
  const { contactId } = req.params;
  const updateContactById = await contactOperations.updateContact(
    contactId,
    req.body
  );
  if (!updateContactById) {
    throw createError(404, "Not found");
  }
  res.json(updateContactById);
};

const ctrlRemoveContact = async (req, res) => {
  const { contactId } = req.params;
  const deleteContactById = await contactOperations.removeContact(contactId);
  if (!deleteContactById) {
    throw createError(404, "Not found");
  }
  res.json({ message: "Contact deleted" });
};

module.exports = {
  ctrlListContacts,
  ctrlGetById,
  ctrlAddContact,
  ctrlUpdateContact,
  ctrlRemoveContact,
};
