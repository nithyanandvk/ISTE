// const cloudinary = require("cloudinary").v2;
// const { CloudinaryStorage } = require("multer-storage-cloudinary");

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "iste",
//     allowedFormats: ["png", "jpg", "jpeg"],
//   },
// });

// module.exports = {
//   cloudinary,
//   storage,
// };



const ImageKit = require("imagekit");
const multer = require("multer");
const sharp = require("sharp");





const imagekit = new ImageKit({
  publicKey: "public_RXl+mwr+SMLQts8rbHFSP3bK4Uo=",
  privateKey: "private_IB1lYm5lgKN3J2lKDrOP7MjPQ68=",
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  authenticationEndpoint: "http://www.yourserver.com/auth",
});

const compressImage = async (buffer) => {
  return await sharp(buffer)
    .jpeg({ quality: 80 })   // Compress to JPEG with 80% quality
    .toBuffer();
};


const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PNG, JPG, and JPEG are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = {
  imagekit,
  upload,
  compressImage
};