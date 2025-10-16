const {
  addNoteService,
  fetchNoteService,
  fetchTagsList,
} = require("../services/noteService");
const noteSchema = require("../validators/noteValidator");

exports.fetchNotes = async (req, res) => {
  const page = Number.parseInt(req.query.page) || 1;
  const limit = Number.parseInt(req.query.limit) || 10;
  const filters = {};

  if (
    req.query.isArchived !== undefined &&
    req.query.isArchived !== "undefined"
  ) {
    filters.isArchived = req.query.isArchived === "true";
  }

  if (
    req.query.tags &&
    req.query.tags !== "undefined" &&
    req.query.tags.trim() !== ""
  ) {
    filters.tags = { $in: req.query.tags.split(",") };
  }

  if (
    req.query.search &&
    req.query.search !== "undefined" &&
    req.query.search.trim() !== ""
  ) {
    // Implement text search using MongoDB's text index
    // $text part signals mongo db that this is a full text search query
    // $search part provides the actual text, eg: "express pagination"
    filters.$text = { $search: req.query.search };
  }

  if (req.query.createdBy && req.query.createdBy !== "undefined") {
    filters.createdBy = req.query.createdBy;
  }

  const results = await fetchNoteService(filters, page, limit);

  return res
    .status(200)
    .json({ message: "message gone", data: results, query: filters });
};

exports.addNote = async (req, res) => {
  const note = req.body;
  const { error } = noteSchema.validate(note);
  if (error) {
    console.log(error.details);
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    // If validation passes, proceed with creating the document
    const results = await addNoteService(note);
    return res
      .status(200)
      .json({ data: results, message: "Data inserted in DB" });
  } catch (dbError) {
    // Handle database-related errors
    return res.status(500).json({
      message: "Error inserting data into DB",
      error: dbError.message,
    });
  }
};

exports.getTagList = async (req, res) => {
  try {
    const results = await fetchTagsList();
    return res.status(200).json({ data: results });
  } catch (err) {
    return res
      .status(503)
      .json({ message: "Error getting the data from the DB: ", error: err });
  }
};
