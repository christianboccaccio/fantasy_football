const dynamicGet = require("../models/sleeperModel");

const dynamicController = async (req, res) => {
  try {
    const response = await dynamicGet(req);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = dynamicController;
