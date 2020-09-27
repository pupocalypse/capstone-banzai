const fs = require("fs");
const path = require("path");

const charactersPath = path.join(__dirname, "../db/characters.json");

const listCharacters = () => {
  const characters = JSON.parse(fs.readFileSync(charactersPath));
  return characters;
};

const getCharacterData = () => {};

const addNewCharacter = () => {};

module.exports = { listCharacters, getCharacterData, addNewCharacter };
