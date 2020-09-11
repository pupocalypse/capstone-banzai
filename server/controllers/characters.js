const charactersModel = require("../models/characters");

const getCharacters = (req, res) => {
  const characters = charactersModel.listCharacters();
  res.json(characters);
};

module.exports = { getCharacters };
