const charactersModel = require("../models/characters");

const getCharacters = (req, res) => {
  const characters = charactersModel.listCharacters();
  res.json(characters);
};

const getCharacterById = (req, res) => {};

const createCharacter = (req, res) => {};

module.exports = { getCharacters, getCharacterById, createCharacter };
