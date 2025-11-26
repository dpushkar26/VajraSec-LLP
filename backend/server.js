import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import blogRoutes from "./routes/blogRoutes.js";
import uploadRoute from "./controller/routeUpload.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/blogs", blogRoutes);
app.use("/api/upload", uploadRoute);

const start = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB server connected");

    app.listen(5000, () => {
      console.log("🚀 Server running on http://localhost:5000");
    });
  } catch (err) {
    console.error("❌ DB connection failed:", err.message);
  }
};

start();
