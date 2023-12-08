const createError = require("http-errors");
const { Contact } = require("../models/contacts");

const ctrlListContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email subscription ");
  res.json({ page, per_page: limit, total: contacts.length, contacts });
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
  const { _id } = req.user;
  const newContact = await Contact.create({ ...req.body, owner: _id });
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
