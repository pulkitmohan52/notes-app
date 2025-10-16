const express = require("express");
const {
  fetchNotes,
  addNote,
  getTagList,
} = require("../controller/noteController");
const router = express.Router();

router.get("/", fetchNotes);
router.post("/add-note", addNote);
router.get("/get-tags-list", getTagList);

module.exports = router;
