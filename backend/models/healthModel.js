const healthCheck = async (req) => {
  return await new Promise((resolve, reject) => {
    try {
      resolve({ message: "Backend is healthy." });
    } catch (error) {
      console.error("Controller Error:", error);
      reject({ message: "Backend is not healthy." });
    }
  });
};

module.exports = { healthCheck };
