import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Blogs from './components/Blogs'
import BlogDetails from './components/BlogDetails' 
import Loader from './components/loader'
import AdminDashboard from './components/AdminDashboard'

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
    
  )
}

function AppContent() {
  const location = useLocation()

  return (
    <>
      {/* Render Loader only on home route */}
      {location.pathname === '/' && <Loader />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetails />} /> 
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  )
}

export default App
