import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Add this import

function AdminDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    author: "",
    image: null,
  });
  const navigate = useNavigate(); // Add this line

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newBlog.title);
    formData.append("content", newBlog.content);
    formData.append("author", newBlog.author);
    if (newBlog.image) formData.append("image", newBlog.image);

    try {
      await axios.post("http://localhost:5000/api/blogs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchBlogs();
      setNewBlog({ title: "", content: "", author: "", image: null });
      navigate("/blogs"); // Redirect to blogs route after successful post
    } catch (err) {
      console.error("Error adding blog:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* New Blog Form */}
      <form
        onSubmit={handleBlogSubmit}
        className="bg-gray-900 p-6 rounded-lg mb-8 space-y-4"
      >
        <h2 className="text-xl font-semibold">Add New Blog</h2>
        <input
          type="text"
          placeholder="Title"
          value={newBlog.title}
          className="w-full p-2 bg-gray-800 rounded"
          onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          value={newBlog.content}
          className="w-full p-2 bg-gray-800 rounded"
          onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          value={newBlog.author}
          className="w-full p-2 bg-gray-800 rounded"
          onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
        />
        <input
          type="file"
          onChange={(e) => setNewBlog({ ...newBlog, image: e.target.files[0] })}
        />
        <button className="bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700">
          Post Blog
        </button>
      </form>

      {/* Blogs List with Delete */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-gray-900 p-4 rounded-lg shadow-lg">
            {blog.image && (
              <img
                src={blog.image}
                alt={blog.title}
                className="h-40 w-full object-cover rounded mb-4"
              />
            )}
            <h3 className="text-lg font-bold">{blog.title}</h3>
            <p className="text-sm text-gray-400">{blog.content}</p>
            <p className="text-xs text-gray-500 mt-2">By {blog.author}</p>
            <button
              onClick={() => handleDelete(blog._id)}
              className="mt-3 flex items-center gap-2 bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              <FaTrash /> Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
