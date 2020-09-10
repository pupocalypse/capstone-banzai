const express = require("express");
const router = express.Router();

const clansControllers = require("../controllers/clans");

router.get("/", clansControllers.getClans);

module.exports = router;
