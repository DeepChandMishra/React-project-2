import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ onSearch, onClear, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleSearchClear = () => {
    setSearchTerm("");
    onClear();
  };

  const handleLogout = () => {
    onLogout();
    navigate("/login"); // Navigate to login page
  };

  return (
    <nav className="bg-white shadow-lg p-4 flex justify-between items-center rounded-lg mx-4 my-2 overflow-hidden">
      <Link
        to="/"
        className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition duration-200"
      >
        My App
      </Link>
      <div className="flex items-center">
        <form onSubmit={handleSearchSubmit} className="flex items-center">
          <input
            type="text"
            placeholder="Search users"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded-lg p-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Search
          </button>
          <button
            type="button"
            onClick={handleSearchClear}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200 m-2"
          >
            Clear
          </button>
        </form>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
