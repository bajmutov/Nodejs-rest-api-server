const { isValidObjectId } = require("mongoose");

const createError = require("http-errors");

const isValidId = (req, _, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    const error = createError(400, `${contactId} Is not valid id`);
    next(error);
  }
  next();
};

module.exports = isValidId;
