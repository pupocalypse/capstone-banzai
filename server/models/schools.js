const fs = require("fs");
const path = require("path");

const schoolsPath = path.join(__dirname, "../db/schools-bushi.json");

const listSchools = () => {
  const schools = JSON.parse(fs.readFileSync(schoolsPath));
  return schools;
};

module.exports = { listSchools };
