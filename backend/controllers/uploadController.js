const { processFile } = require("../models/uploadModel");

const uploadFile = async (req, res) => {
  try {
    const result = await processFile(req);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { uploadFile };
