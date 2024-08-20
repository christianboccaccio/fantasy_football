const express = require("express");
const { getUploads, updateUploads } = require("../controllers/dataController");

const router = express.Router();

router.get("/uploads", getUploads);
router.put("/uploads/:fileValue", updateUploads);

module.exports = router;
