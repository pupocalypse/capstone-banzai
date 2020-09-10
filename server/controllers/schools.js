const schoolsModel = require("../models/schools");

const getSchools = (req, res) => {
  const schools = schoolsModel.listSchools();
  res.json(schools);
};

module.exports = { getSchools };
