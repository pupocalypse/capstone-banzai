const fs = require("fs");
const path = require("path");

const clansPath = path.join(__dirname, "../db/clans.json");

const listClans = () => {
  const clans = JSON.parse(fs.readFileSync(clansPath));
  return clans;
};

module.exports = { listClans };
