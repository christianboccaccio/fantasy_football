const express = require("express");
const router = express.Router();
const dynamicController = require("../controllers/sleeperController");

router.get("/dynamic/:title", dynamicController);

module.exports = router;
