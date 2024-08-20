const { get, update } = require("../models/dataModel");

const getUploads = async (_, res) => {
  try {
    res.json(await get());
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ error: error.message });
  }
};

const updateUploads = async (req, res) => {
  const fileValue = req.params.fileValue;
  try {
    const newUploads = await update(fileValue);
    res.json(newUploads);
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getUploads, updateUploads };
