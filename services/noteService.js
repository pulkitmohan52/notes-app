const Note = require("../models/Note");

exports.addNoteService = async (note) => {
  try {
    const insertedNote = Note.create(note);
    return insertedNote;
  } catch (error) {
    console.error("Insertion error: ", error);
    throw new Error();
  }
};

exports.fetchNoteService = async (filters, page, limit) => {
  const skip = (page - 1) * limit;

  const [items, totalItems] = await Promise.all([
    Note.find(filters).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Note.countDocuments(filters),
  ]);

  const totalPages = Math.ceil(totalItems / limit);
  return {
    items,
    pageInfo: { totalItems, totalPages, currentPage: page, limit },
  };
};

exports.fetchTagsList = async () => {
  try {
    const notes = await Note.distinct("tags");
    return notes;
  } catch (error) {
    console.error("Error while fetching the tags list came up: ", error);
    throw new Error();
  }
};
