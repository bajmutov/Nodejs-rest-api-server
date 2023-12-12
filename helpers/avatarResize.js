const Jimp = require("jimp");

const avatarResize = async (filePath) => {
  const img = await Jimp.read(filePath);
  img
    .autocrop()
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(filePath);
};

module.exports = avatarResize;
