const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");

const PORT = 8000;

const clansRoute = require("./routes/clans.js");
const schoolsRoute = require("./routes/schools.js");
const skillsRoute = require("./routes/skills.js");
const charactersRoute = require("./routes/characters.js");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads/artwork");
  },
  filename: (req, file, callback) => {
    // rename filename here - can it use req.body?
    const newFilename = `${req.body.lastName}${
      req.body.firstName
    }${path.extname(file.originalname)}`;
    callback(null, newFilename);
  },
});
const upload = multer({ storage });

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Banzai's server!");
});

app.use("/clans", clansRoute);
app.use("/schools", schoolsRoute);
app.use("/skills", skillsRoute);
app.use("/characters", charactersRoute);

app.listen(PORT, () =>
  console.log(`Listening on port http://localhost:${PORT}`)
);

module.exports = { upload };
