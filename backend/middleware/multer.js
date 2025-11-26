import multer from "multer";

const storage = multer.memoryStorage(); // Store file in memory for Cloudinary upload

const upload = multer({ storage });

export default upload;
