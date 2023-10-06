require('dotenv').config();
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: "public_Xfqzhp0fpv4SOGYEzRDQMgHppJ4=",
  privateKey: process.env.IMGK_PRIV_KEY,
  urlEndpoint: "https://ik.imagekit.io/dug63etx5"
});

module.exports = imagekit

