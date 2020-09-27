const express = require("express");
const router = express.Router();

const upload = require("../server");
const charactersControllers = require("../controllers/characters");

router.get("/", charactersControllers.getCharacters);
router.get("/:id", charactersControllers.getCharacterById);
router.post(
  "/",
  // upload.single("artwork"),
  charactersControllers.createCharacter
);

module.exports = router;
