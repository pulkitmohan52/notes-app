// validators/noteValidator.js
const Joi = require("joi");
const JoiObjectId = require("joi-objectid")(Joi);

const noteSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  content: Joi.string().min(10).required(), // Example: adding a minimum length to content for API validation
  tags: Joi.array().items(Joi.string().trim()),
  // isArchived and timestamps are handled by the database schema and are not needed here
  isArchived: Joi.boolean(),
  createdBy: JoiObjectId().required(),
});

module.exports = noteSchema;
