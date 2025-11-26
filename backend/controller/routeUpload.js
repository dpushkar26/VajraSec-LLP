import express from "express";
import cloudinary from "../utils/Cloudinary.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/upload", upload.single("image"), (req, res) => {
  cloudinary.uploader.upload(req.file.path, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Error uploading image",
      });
    }

    res.status(200).json({
      success: true,
      message: "Uploaded!",
      data: result,
    });
  });
});

export default router;
