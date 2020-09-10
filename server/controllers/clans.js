const clansModel = require("../models/clans");

const getClans = (req, res) => {
  const clans = clansModel.listClans();
  res.json(clans);
};

module.exports = { getClans };
