const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const charactersControllers = require("../controllers/characters");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads/artwork");
  },
  filename: (req, file, callback) => {
    const shortenId = uuidv4().split("-");
    const newFilename = `${req.body.lastName}${req.body.firstName}-${
      shortenId[0]
    }${path.extname(file.originalname)}`;
    callback(null, newFilename);
  },
});
const upload = multer({ storage });

router.get("/", charactersControllers.getCharacters);
router.get("/:id", charactersControllers.getCharacterById);
router.post(
  "/",
  upload.single("artwork"),
  charactersControllers.createCharacter
);

module.exports = router;
