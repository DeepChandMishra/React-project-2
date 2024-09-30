import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateUser = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [name, setName] = useState(state.user.name || "");
  const [email, setEmail] = useState(state.user.email || "");
  const [phone, setPhone] = useState(state.user.phone || "");
  const [password, setPassword] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const updateData = { name, phone };

      if (password) {
        updateData.password = password; // Only include password if provided
      }

      const response = await axios.put(
        `http://localhost:8000/api/update/${state.user.id}`,
        updateData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(response.data.message);
      navigate("/table");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-200 to-purple-200 overflow-hidden">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-96"
        onSubmit={handleUpdate}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Update User
        </h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="New Password (optional)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-200"
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => navigate("/table")}
            className="bg-gray-300 text-gray-700 p-3 rounded hover:bg-gray-400 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
