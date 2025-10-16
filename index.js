const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const noteRoutes = require("./routes/noteRoutes");
const Note = require("./models/Note");
const app = express();
const port = 3000;
require("dotenv").config();

//disable cors for the frontend part.
const corsOptions = {
  origin: "http://localhost:5173", // Allow only this origin
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// connect to mongo db
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

app.use("/api/notes", noteRoutes);

app.get("/", (req, res) => {
  return res.send("App works fine");
});

app.listen(port, () => {
  console.log(`App listening on port number ${port}`);
});
