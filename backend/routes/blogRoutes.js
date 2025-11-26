import express from "express";
import Blog from "../models/blogModel.js";
import upload from "../middleware/multer.js";
import cloudinary from "../utils/Cloudinary.js";

const router = express.Router();

// Get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get single blog by ID
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    
    // Increment views when blog is fetched
    blog.views = (blog.views || 0) + 1;
    await blog.save();
    
    res.json(blog);
  } catch (err) {
    console.error("Error fetching blog:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Add new blog
router.post("/", upload.single("image"), async (req, res) => {
  try {
    let imageUrl = "";
    if (req.file) {
      // Wrap upload_stream in a Promise
      imageUrl = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "image", folder: "blogs" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }
        );
        uploadStream.end(req.file.buffer);
      });
      console.log(imageUrl);
    }

    const { title, content, author } = req.body;
    console.log("Outside:",imageUrl);
    const blog = new Blog({
      title,
      content,
      author,
      image: imageUrl,
    });
    console.log(blog);
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error("Blog creation error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Like/Unlike blog
router.put("/:id/like", async (req, res) => {
  try {
    const { userId } = req.body;
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    const likeIndex = blog.likes.indexOf(userId);
    if (likeIndex === -1) {
      // Like the blog
      blog.likes.push(userId);
    } else {
      // Unlike the blog
      blog.likes.splice(likeIndex, 1);
    }
    
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// View blog (separate endpoint if needed)
router.put("/:id/view", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    blog.views = (blog.views || 0) + 1;
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete blog
router.delete("/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;