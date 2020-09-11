const express = require("express");
const router = express.Router();

const charactersControllers = require("../controllers/characters");

router.get("/", charactersControllers.getCharacters);

module.exports = router;
