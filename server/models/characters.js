const fs = require("fs");
const path = require("path");

const charactersPath = path.join(__dirname, "../db/characters.json");
// const skillsPath = path.join(__dirname, "../db/skills.json");

const listCharacters = () => {
  const characters = JSON.parse(fs.readFileSync(charactersPath));
  return characters;
};

module.exports = { listCharacters };
