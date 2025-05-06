import React from "react"; 
import "../index.css"
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-lime-700 text-white">
      <div className="max-w-full mx-auto px-4 py-10 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:justify-items-center lg:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-300">
              Your one-stop solution for managing restaurants, exploring
              delicious foods, and enhancing your dining experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/PropertyCard" className="hover:underline">
                  All Properties
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe to our Newsletter</h3>
            <form>
              <div className="flex  flex-col sm:flex-row w-3/5 md:items-center gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="sm:w-auto w-full flex-1 px-4 py-2 rounded-md text-gray-800 focus:outline-none"
                />
                <button
                  type="submit"
                  className="md:w-full  w-4/5 sm:w-auto bg-gradient-to-r from-blue-500 to-[#75a3ecda] hover:from-blue-600 hover:to-[#5179b5da] text-white px-4 py-2 rounded-md transition duration-300"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-500 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center w-3/5 mx-auto justify-between gap-4">
          <div>
          <p className="text-gray-300 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Restaurant Management. All rights reserved.
          </p>
          </div>

          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
