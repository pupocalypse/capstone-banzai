const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const CHARACTERS = path.join(__dirname, "../db/characters.json");

class Character {
  constructor({ ...data }) {
    this.id = this.shortenId();
    this.timestamp = Date.parse(new Date());
    this.artwork = JSON.parse(data.artwork);
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.job = data.job;
    this.clan = data.clan;
    this.family = JSON.parse(data.family);
    this.school = JSON.parse(data.school);
    this.totalExp = data.totalExp;
    this.currentExp = data.currentExp;
    this.rings = JSON.parse(data.rings);
    this.skills = JSON.parse(data.skills);
  }

  shortenId = () => {
    const newId = uuidv4().split("-");
    return newId[newId.length - 1];
  };
}

const listCharacters = () => {
  const characters = JSON.parse(fs.readFileSync(CHARACTERS));
  return characters;
};

const addNewCharacter = (characterData) => {
  const characters = JSON.parse(fs.readFileSync(CHARACTERS));
  const newCharacter = new Character(characterData);
  characters.push(newCharacter);
  fs.writeFileSync(CHARACTERS, JSON.stringify(characters));
  return characters;
};

module.exports = { listCharacters, addNewCharacter };
