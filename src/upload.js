const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDirectory = "././uploads/images";

if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

const uploadLogo = upload.single("logo");

module.exports = { uploadLogo };
