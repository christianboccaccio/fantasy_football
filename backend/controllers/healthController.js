const { healthCheck } = require("../models/healthModel");

const healthController = async (req, res) => {
  try {
    res.json(await healthCheck(req, res));
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { healthController };
