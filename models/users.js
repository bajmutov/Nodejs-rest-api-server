const { Schema, model } = require("mongoose");
const Joi = require("joi");
const handleMongooseError = require("../middleWarres/handleMongooseError");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  email: Joi.string().required().messages({
    "any.required": "Email is required!",
    "string.empty": "Email can't be empty!",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required!",
    "string.empty": "Password can't be empty!",
  }),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const loginSchema = Joi.object({
  email: Joi.string().required().messages({
    "any.required": "Email is required!",
    "string.empty": "Email can't be empty!",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required!",
    "string.empty": "Password can't be empty!",
  }),
});

const emailSchema = Joi.object({
  email: Joi.string().required().messages({
    "any.required": "Email is required!",
    "string.empty": "Email can't be empty!",
  }),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const schemas = {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
  emailSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
