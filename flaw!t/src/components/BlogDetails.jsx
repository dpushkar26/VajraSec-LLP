import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  
  // Get userId from localStorage or your auth system
  const userId = localStorage.getItem("userId") || "guest-user";

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/blogs/${id}`);
      setBlog(response.data);
      setIsLiked(response.data.likes.includes(userId));
      setError(null);
    } catch (err) {
      console.error("Error fetching blog:", err);
      setError("Failed to load blog. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/blogs/${id}/like`, {
        userId: userId
      });
      setBlog(response.data);
      setIsLiked(!isLiked);
    } catch (err) {
      console.error("Error liking blog:", err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`http://localhost:5000/api/blogs/${id}`);
        navigate("/blogs");
      } catch (err) {
        console.error("Error deleting blog:", err);
        alert("Failed to delete blog");
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatContent = (content) => {
    // Split content into paragraphs for better readability
    return content.split('\n').map((paragraph, index) => (
      paragraph.trim() && (
        <p key={index} className="mb-4 text-gray-300 leading-relaxed">
          {paragraph}
        </p>
      )
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-white mt-4">Loading blog...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <div className="text-center">
          <p className="text-red-500 text-xl">{error}</p>
          <button 
            onClick={() => navigate("/blogs")}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <p className="text-white text-xl">Blog not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Hero Section with Image */}
      {blog.image && (
        <div className="relative h-96 w-full overflow-hidden">
          <img 
            src={blog.image} 
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Back Button */}
        <button 
          onClick={() => navigate("/blogs")}
          className="mb-6 text-gray-400 hover:text-white transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blogs
        </button>

        {/* Blog Header */}
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl shadow-2xl p-8 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {blog.title}
          </h1>
          
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm mb-6 pb-6 border-b border-gray-700">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formatDate(blog.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{blog.views} views</span>
            </div>
          </div>

          {/* Blog Content */}
          <div className="prose prose-invert max-w-none">
            {formatContent(blog.content)}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-6">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all transform hover:scale-105 ${
              isLiked 
                ? 'bg-red-600 text-white hover:bg-red-700' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <svg 
              className="w-5 h-5" 
              fill={isLiked ? "currentColor" : "none"} 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
              />
            </svg>
            <span>{blog.likes.length} {blog.likes.length === 1 ? 'Like' : 'Likes'}</span>
          </button>

          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("Link copied to clipboard!");
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-all transform hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032-4.026A9.001 9.001 0 0112 3c-4.474 0-8.268 2.943-9.543 7a9.97 9.97 0 011.827 3.026m9.032 4.026A9.97 9.97 0 0120.973 12c-.478-1.343-1.155-2.549-1.973-3.573m-9.032 4.026c.394.383.827.726 1.293 1.021m2.421 0a9.97 9.97 0 002.272-1.021" />
            </svg>
            Share
          </button>

         
          <button
            onClick={handleDelete}
            className="ml-auto flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all transform hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
          */
        </div>

        {/* You might want to add a comments section here */}
        {/* <CommentsSection blogId={id} /> */}
      </div>
    </div>
  );
}

export default BlogDetails;