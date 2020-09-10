const express = require("express");
const router = express.Router();

const skillsControllers = require("../controllers/skills");

router.get("/", skillsControllers.getSkills);

module.exports = router;
