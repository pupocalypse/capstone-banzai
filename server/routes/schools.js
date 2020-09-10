const express = require("express");
const router = express.Router();

const schoolsControllers = require("../controllers/schools");

router.get("/", schoolsControllers.getSchools);

module.exports = router;
