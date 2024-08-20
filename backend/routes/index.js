const express = require("express");
const router = express.Router();
const healthRoutes = require("./healthRoutes");
const uploadRoutes = require("./uploadRoutes");
const dataRoutes = require("./dataRoutes");
const sleeperRoutes = require("./sleeperRoutes")

router.use("/health", healthRoutes);
router.use("/data",dataRoutes);
router.use("/upload", uploadRoutes);
router.use('/sleeper', sleeperRoutes);

module.exports = router;
