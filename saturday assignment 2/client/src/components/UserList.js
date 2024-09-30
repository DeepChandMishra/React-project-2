import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteUser from "./DeleteUser";

const UserList = ({ search }) => {
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState("id");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(true);
  const [userToDelete, setUserToDelete] = useState(null);
  const navigate = useNavigate();

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/search", {
        params: { search, sortBy },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      
      setUsers(response.data.users); // Assuming response includes all users
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, [search, sortBy]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = (user) => {
    setUserToDelete(user);
  };

  const handleUpdate = (userData) => {
    navigate("/update", { state: { user: userData } });
  };

  // Calculate total pages based on users length
  const totalPages = Math.ceil(users.length / pageSize);
  
  // Get users for the current page
  const paginatedUsers = users.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-r from-blue-200 to-purple-200 overflow-hidden">
      <div className="p-4 w-full max-w-6xl mx-auto">
        <div className="mb-4 flex items-center">
          <label className="mr-2">Sort by:</label>
          <select
            onChange={(e) => setSortBy(e.target.value)}
            value={sortBy}
            className="border border-gray-400 rounded-md p-2 bg-white hover:border-blue-500 transition duration-200"
          >
            <option value="id">ID</option>
            <option value="name">Name</option>
            <option value="createdAt">Created At</option>
          </select>
        </div>
        <div className="overflow-hidden rounded-lg shadow-lg">
          <table className="min-w-full border border-gray-300 bg-white">
            <thead className="bg-teal-500 text-white">
              <tr>
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Deleted At</th>
                <th className="p-2 border w-1/4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center p-4">
                    Loading...
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user, index) => (
                  <tr key={user.id} className="hover:bg-gray-100">
                    <td className="p-2 border">{(currentPage - 1) * pageSize + index + 1}</td>
                    <td className="p-2 border">
                      <span className={user.deleted_at ? "text-red-500" : ""}>
                        {user.name}{" "}
                        {user.deleted_at && <span>(Soft Deleted)</span>}
                      </span>
                    </td>
                    <td className="p-2 border">{user.email}</td>
                    <td className="p-2 border">{user.phone}</td>
                    <td className="p-2 border">
                      {user.deleted_at
                        ? new Date(user.deleted_at).toLocaleString()
                        : "Active"}
                    </td>
                    <td className="p-2 border flex justify-center space-x-2">
                      <button
                        className={`px-3 py-1 rounded transition duration-200 ${
                          user.deleted_at
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                        onClick={() => handleUpdate(user)}
                        disabled={!!user.deleted_at}
                      >
                        Update
                      </button>
                      <button
                        className={`px-3 py-1 rounded transition duration-200 ${
                          user.deleted_at
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-red-500 text-white hover:bg-red-600"
                        }`}
                        onClick={() => handleDelete(user)}
                        disabled={!!user.deleted_at}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {userToDelete && (
          <DeleteUser
            userToDelete={userToDelete}
            setUserToDelete={setUserToDelete}
            refreshData={fetchUsers}
          />
        )}
        {/* Pagination Controls */}
        <div className="flex justify-between mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className={`px-4 py-2 rounded-md transition duration-200 ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Previous
          </button>
          <span className="self-center">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage >= totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className={`px-4 py-2 rounded-md transition duration-200 ${
              currentPage >= totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserList;
