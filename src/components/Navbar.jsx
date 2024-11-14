// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../DarkModeContext'; // Import DarkModeContext
import logo from '../assets/images/logo.png';

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext); // Access dark mode state and toggle function

  return (
    <div>
    <nav className="bg-indigo-700 dark:bg-gray-900 border-b border-indigo-500 dark:border-gray-700">
  <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    <div className="flex h-20 items-center justify-between">
      <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
        {/* Logo */}
        <Link to="/" className="flex flex-shrink-0 items-center mr-4">
          {/* <img className="h-10 w-auto" src={logo} alt="React Jobs" /> */}
          <span className="hidden md:block text-white dark:text-gray-300 text-2xl font-bold ml-2">
            Remote Jobs
          </span>
        </Link>
        <div className="md:ml-auto">
          <div className="flex space-x-2">
            <Link
              to="/"
              className="text-white dark:text-gray-300 bg-black dark:bg-gray-800 hover:bg-gray-900 dark:hover:bg-gray-700 rounded-md px-3 py-2"
            >
              Home
            </Link>
            <Link
              to="/jobs"
              className="text-white dark:text-gray-300 hover:bg-gray-900 dark:hover:bg-gray-700 rounded-md px-3 py-2"
            >
              Jobs
            </Link>
            <Link
              to="/add-job"
              className="text-white dark:text-gray-300 hover:bg-gray-900 dark:hover:bg-gray-700 rounded-md px-3 py-2"
            >
              Add Job
            </Link>
            <Link
              to="/competitor"
              className="text-white dark:text-gray-300 hover:bg-gray-900 dark:hover:bg-gray-700 rounded-md px-3 py-2"
            >
              Competitor
            </Link>

            {/* Dark Mode Toggle */}
            <label className="inline-flex items-center cursor-pointer">
  <input
    type="checkbox"
    checked={isDarkMode}
    onChange={toggleDarkMode}
    className="sr-only peer"
  />
  <div className="relative w-16 h-8 bg-gray-300 dark:bg-gray-800 rounded-lg peer-checked:bg-blue-500 peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 transition-all">
    <div className="absolute top-1 left-1 bg-white w-6 h-6 rounded-md shadow-md transition-transform duration-300 ease-in-out peer-checked:translate-x-8"></div>
  </div>
  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300 transition-all duration-300">
    Dark mode
  </span>
</label>


          </div>
        </div>
      </div>
    </div>
  </div>
</nav>

    </div>
  );
};

export default Navbar;
