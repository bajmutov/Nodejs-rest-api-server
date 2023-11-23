const contactOperations = require("../models/contacts");
const contactSchema = require("../schemas/contactSchema");
const createError = require("http-errors");

const ctrlListContacts = async (req, res, next) => {
  try {
    const contacts = await contactOperations.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const ctrlGetById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactById = await contactOperations.getById(contactId);
    if (!contactById) {
      throw createError(404, "Not found");
    }
    res.json(contactById);
  } catch (error) {
    next(error);
  }
};

const ctrlAddContact = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const newContact = await contactOperations.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const ctrlUpdateContact = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const updateContactById = await contactOperations.updateContact(
      contactId,
      req.body
    );
    if (!updateContactById) {
      throw createError(404, "Not found");
    }

    res.json(updateContactById);
  } catch (error) {
    next(error);
  }
};

const ctrlRemoveContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deleteContactById = await contactOperations.removeContact(contactId);
    if (!deleteContactById) {
      throw createError(404, "Not found");
    }
    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  ctrlListContacts,
  ctrlGetById,
  ctrlAddContact,
  ctrlUpdateContact,
  ctrlRemoveContact,
};
