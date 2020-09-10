const fs = require("fs");
const path = require("path");

const skillsPath = path.join(__dirname, "../db/skills.json");

const listSkills = () => {
  const skills = JSON.parse(fs.readFileSync(skillsPath));
  return skills;
};

module.exports = { listSkills };
