const charactersModel = require("../models/characters");

const getCharacters = (req, res) => {
  const characters = charactersModel.listCharacters();
  res.json(characters);
};

const getCharacterById = (req, res) => {
  const characters = charactersModel.listCharacters();
  const character = characters.filter((char) => char.id === req.params.id);
  if (character) {
    res.json(character[0]);
  } else {
    res
      .status(404)
      .json({ message: `No character found with id ${req.params.id}` });
  }
};

const createCharacter = (req, res) => {
  if (!req.body.firstName) {
    res.status(400).json({
      message: "You must specify a first name to proceed",
    });
  } else {
    const characters = charactersModel.addNewCharacter(req.body);
    res.json(characters);
  }
};

module.exports = { getCharacters, getCharacterById, createCharacter };
