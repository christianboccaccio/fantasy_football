const storeFileDetails = (filename, filepath) => {
  files[filename] = filepath;
};

const deleteFileDetails = (filename) => {
  delete files[filename];
};

module.exports = { storeFileDetails, deleteFileDetails };
