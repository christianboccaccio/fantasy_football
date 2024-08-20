const fs = require("fs");
const path = require("path");
const csv = require("csvtojson");

const processFile = async (req) => {
  try {
    const fileName = req.params.fileName;
    const csvFilePath = req.file.path;

    const jsonArray = await csv().fromFile(csvFilePath);

    const jsonFilePath = path.join("uploads", `${fileName}.json`);

    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonArray, null, 2));

    fs.unlink(csvFilePath, (err) => {
      if (err) {
        console.error(`Failed to delete CSV file: ${err.message}`);
      }
    });

    return {
      message: "File uploaded and converted to JSON successfully",
      jsonFilePath,
    };
  } catch (error) {
    console.error("Upload Error:", error);
    throw new Error("Failed to process the file");
  }
};

module.exports = {
  processFile,
};
