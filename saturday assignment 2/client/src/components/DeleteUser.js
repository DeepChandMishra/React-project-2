import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const DeleteUser = ({ userToDelete, setUserToDelete, refreshData }) => {
  const handleDelete = async () => {
    if (!userToDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:8000/api/delete/${userToDelete.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(`${userToDelete.name} has been soft deleted!`);
      setUserToDelete(null);
      refreshData();
    } catch (error) {
      toast.error("Failed to delete user. Please try again.");
      console.error("Error deleting user:", error);
    }
  };

  if (!userToDelete) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-30"></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-80">
        <h3 className="text-lg font-semibold mb-4">
          Are you sure you want to delete {userToDelete.name}?
        </h3>
        <div className="flex justify-end">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200 mr-2"
          >
            Yes, delete
          </button>
          <button
            onClick={() => setUserToDelete(null)}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
