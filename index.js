const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db.js");
const dotenv = require('dotenv')
const path = require('path')
import auth from "./routes/auth.js";
import notes from "./routes/notes.js"

dotenv.config();
connectDB();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json("It works!");
});
auth(app);
notes(app);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
