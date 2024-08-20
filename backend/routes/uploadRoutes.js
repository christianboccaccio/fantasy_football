const express = require("express");
const { uploadFile } = require("../controllers/uploadController");
const uploader = require("../middleware/uploader");

const router = express.Router();

router.post("/file/:fileName", uploader, uploadFile);

module.exports = router;
