import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaPlus,
  FaArrowRight,
  FaTimes,
  FaArrowLeft,
  FaHeart,
  FaEye,
  FaDotCircle,
  FaTrash,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blogs");
      setBlogs(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  // Like blog
  const handleLike = async (id) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/blogs/${id}/like`,
        { userId: "pushkar123" }
      );
      setBlogs((prev) => prev.map((b) => (b._id === id ? res.data : b)));
    } catch (err) {
      console.error("Error liking blog:", err);
    }
  };

  // Increment view
  const handleView = async (id) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/blogs/${id}/view`);
      setBlogs((prev) => prev.map((b) => (b._id === id ? res.data : b)));
    } catch (err) {
      console.error("Error incrementing view:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Top Header Section */}
      <header className="relative py-12 px-6 max-w-6xl mx-auto">
        <Link
          to="/"
          className="absolute left-6 top-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <FaArrowLeft /> Home
        </Link>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Tips and DIY Inspiration for Creative Minds
            </h1>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Discover a universe of boundless imagination in the World of
              Creative Art, where canvases weave stories, sculptures breathe
              life, and digital realms redefine artistic expression.
            </p>
            <button className="flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 rounded-lg hover:opacity-90 transition">
              Read More <FaArrowRight className="ml-2" />
            </button>
          </div>
          <div>
            <img
              src="../../public/logos/blogdemo.png"
              alt="Art Inspiration"
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>
      </header>

      <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 mx-auto my-12"></div>

      {/* Latest Posts */}
      <section className="max-w-6xl mx-auto px-6 pb-20 flex-1">
        <h2 className="text-3xl font-bold mb-10">Latest Posts</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 hover:shadow-xl transition transform cursor-pointer"
              onClick={() => navigate(`/blogs/${blog._id}`)}
            >
              {/* Blog thumbnail */}
              {blog.image ? (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="h-40 w-full object-cover"
                />
              ) : (
                <div className="h-40 bg-gradient-to-r from-indigo-700 to-purple-700 flex items-center justify-center text-2xl font-bold">
                  No Img
                </div>
              )}

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {blog.content}
                </p>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-indigo-400">By {blog.author}</span>
                  <span className="text-gray-500">
                    {new Date(blog.createdAt).toDateString()}
                  </span>
                </div>

                {/* Likes & Views */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-4 text-sm">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(blog._id);
                      }}
                      className="flex items-center gap-1 text-red-500 hover:scale-110 transition"
                    >
                      <FaHeart /> {blog.likes?.length || 0}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleView(blog._id);
                      }}
                      className="flex items-center gap-1 text-gray-400 hover:scale-110 transition"
                    >
                      <FaEye /> {blog.views || 0}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Floating Admin Dashboard Button as small eye icon */}
      <button
        className="fixed bottom-4 right-4 bg-black/70 text-white p-1 rounded-full shadow-lg transition flex items-center justify-center hover:bg-white hover:text-black"
        style={{
          width: '12px',
          height: '12px',
          minWidth: '12px',
          minHeight: '14px',
          fontSize: '12px',
          opacity: 0.7, // partially hidden by default
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = 1)}
        onMouseLeave={e => (e.currentTarget.style.opacity = 0.7)}
        onClick={() => navigate('/admin')}
        title="Go to Admin Dashboard"
      >
        <FaEye size={16} />
      </button>

      {/* Footer */}
      <footer className="text-gray-400 py-6 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold">VajraSec Security LLP</span>. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}

export default Blogs;
