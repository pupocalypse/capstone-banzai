const skillsModel = require("../models/skills");

const getSkills = (req, res) => {
  const skills = skillsModel.listSkills();
  res.json(skills);
};

module.exports = { getSkills };
