import React from "react";
import { FaArrowRight } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden bg-black text-white">
      {/* Background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-black">
        {/* Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:14px_24px]" />
        {/* Radial glow */}
        <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] mx-auto rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#111,#000)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left: Call to action */}
          <div>
            <h2 className="text-2xl font-bold leading-snug">
              Let’s do great work together
            </h2>
            <p className="mt-4 text-lg">Sign up for our newsletter*</p>

            {/* Newsletter box */}
            <div className="mt-4 flex rounded-full overflow-hidden border border-white">
              <input
                type="email"
                placeholder="Your Email *"
                className="w-full px-4 py-3 text-white focus:outline-none"
              />
              <button className="bg-white text-black px-5 flex items-center justify-center border-l border-white hover:bg-gray-200 transition">
                <FaArrowRight className="text-xl" />
              </button>
            </div>
          </div>

          {/* Middle: Sitemap */}
          <div>
            <h3 className="text-lg font-bold mb-4">SITEMAP</h3>
            <ul className="space-y-2 font-medium">
              <li><a href="#">Home</a></li>
              <li><a href="#">About us</a></li>
              <li><a href="#">Our Services</a></li>
              <li><a href="#">Projects</a></li>
              <li><a href="#">Blogs</a></li>
              
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-bold mb-4">SOCIAL</h3>
            <ul className="space-y-2 font-medium">
              <li><a href="https://www.linkedin.com/company/vajrasec-technologies-pvt-ltd/" className="underline">LinkedIn</a></li>
             
            </ul>
          </div>

          {/* NEW — Contact Us */}
          <div>
            <h3 className="text-lg font-bold mb-4">CONTACT US</h3>

            <p className="font-medium">
              <span className="text-gray-400">Mobile:</span><br />
              8087405952
            </p>
            <p className="font-medium">
              <span className="text-gray-400">Email:</span><br />
              yogesh@vajrasectech.com 
            </p>

            <p className="font-medium mt-4">
              <span className="text-gray-400">Address:</span><br />
              VajraSec Technologies Pvt. Ltd.<br />
              E-05/01-A,SEC 52 NOID,Noida,Gautam Buddha Nagar,Noida,Uttar Pradesh,India,201301
            </p>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-800" />

        {/* Bottom Logo */}
        <div className="flex justify-center mb-6">
          <h1 className="text-4xl font-monteserrat tracking-wide">
            <span className="text-blue-500 font-bold">Vajra</span>
            <span className="text-white font-boldz">Sec</span>
            <span className="text-white"> Technologies Pvt. Ltd.</span>
          </h1>
        </div>

        {/* Divider */}
        <hr className="mb-6 border-gray-800" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© 2025 VajraSec Technologies Pvt. Ltd. All Rights Reserved.</p>
          <a href="#" className="font-bold underline mt-2 md:mt-0"></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
