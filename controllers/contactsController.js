const createError = require("http-errors");
const { Contact } = require("../models/contacts");

const ctrlListContacts = async (_, res) => {
  const contacts = await Contact.find({}, "-updatedAt -createdAt");
  res.json(contacts);
};

const ctrlGetById = async (req, res) => {
  const { contactId } = req.params;
  const contactById = await Contact.findById(contactId);
  console.log("first", contactById);
  if (!contactById) {
    throw createError(404, "Not found");
  }
  res.json(contactById);
};

const ctrlAddContact = async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
};

const ctrlUpdateContact = async (req, res) => {
  const { contactId } = req.params;
  const updateContactById = await Contact.findByIdAndUpdate(
    contactId,
    req.body,
    { new: true }
  );
  if (!updateContactById) {
    throw createError(404, "Not found");
  }
  res.json(updateContactById);
};

const ctrlUpdateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const updateFavorite = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updateFavorite) {
    throw createError(404, "Not found");
  }
  res.json(updateFavorite);
};

const ctrlRemoveContact = async (req, res) => {
  const { contactId } = req.params;
  const deleteContactById = await Contact.findByIdAndDelete(contactId);
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
  ctrlUpdateStatusContact,
};
