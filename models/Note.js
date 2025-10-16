const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: [2, "Title can't be smaller than 3 characters"],
      maxLength: [100, "Title can't be longer than 100 words"],
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    isArchived: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
noteSchema.index({ content: "text", title: "text" });
noteSchema.index({ createdBy: 1, updatedAt: -1 });

module.exports = mongoose.model("Note", noteSchema);
