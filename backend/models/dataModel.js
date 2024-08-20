const fs = require("fs").promises;
const path = require("path");
const uploads = require("../data/uploads.json");

const get = () => uploads;

const update = async (fileValue) => {
  const index = uploads.findIndex((item) => item.value === fileValue);

  if (index === -1) {
    throw new Error("File not found");
  }

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const newUploads = [...uploads];

  newUploads[index] = {
    ...uploads[index],
    lastUploadDate: `${year}-${month}-${day}`,
  };

  try {
    const UPLOADS_PATH = path.join(__dirname, "../data/uploads.json");

    await fs.writeFile(UPLOADS_PATH, JSON.stringify(newUploads, null, 2));

    return newUploads;
  } catch (err) {
    throw new Error("Error saving uploads: " + err.message);
  }
};

module.exports = { get, update };
