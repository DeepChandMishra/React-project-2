import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserList from "./components/UserList";
import UpdateUser from "./components/UpdateUser";
import Navbar from "./components/Navbar";

const App = () => {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });
    }
  }, []);

  const handleSearch = (searchTerm) => {
    setSearch(searchTerm);
  };

  const handleClear = () => {
    setSearch("");
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token"); // Clear token on logout
  };

  return (
    <Router>
      <div className="h-screen flex flex-col bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 overflow-hidden">
        <Toaster />
        {user && (
          <Navbar
            onSearch={handleSearch}
            onClear={handleClear}
            onLogout={handleLogout}
          />
        )}
        <div className="flex-grow p-4 overflow-hidden">
          <Routes>
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/table" element={<UserList search={search} />} />
            <Route path="/update" element={<UpdateUser />} />
            <Route path="/" element={<Login setUser={setUser} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
