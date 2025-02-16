import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LogOut, UserCircle, Menu, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleTheme, theme }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/signin");
  };

  return (
    <nav
      className={`shadow-md py-4 px-6 fixed top-0 left-0 w-full z-50 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-wide">
          <span className={theme === "dark" ? "text-blue-400" : "text-blue-600"}>
            Flash
          </span>
          Cards
        </h1>

        <div className="hidden md:flex items-center space-x-6">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg transition duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {theme === "dark" ? (
              <Sun className="w-6 h-6 text-yellow-400" />
            ) : (
              <Moon className="w-6 h-6 text-gray-700" />
            )}
          </button>

          {/* Conditional Buttons */}
          {isLoggedIn ? (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Dashboard
            </motion.button>
          ) : (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate("/signin")}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
              >
                Login
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate("/signup")}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
              >
                Signup
              </motion.button>
            </>
          )}

          {/* User Profile Dropdown (Only if Logged In) */}
          {isLoggedIn && (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200"
              >
                <UserCircle className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                <span className="font-medium">Profile</span>
              </button>

              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2"
                >
                  <button className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">
                    My Account
                  </button>
                  <button className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">
                    Settings
                  </button>
                  <hr className="my-1 dark:border-gray-700" />
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-700 w-full text-left"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
