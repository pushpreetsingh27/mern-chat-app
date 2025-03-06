import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import AllOtherUsers from "./AllOtherUsers";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setSelectedUsers } from "../redux/userSlice";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const { otherUsers } = useSelector((store) => store.user);

  // Handle logout
  const handleUserLogout = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/user/logout");
      navigate("/login");
      toast.success(response.data.message);
      dispatch(setSelectedUsers(null));
      dispatch(setAuthUser(null));
    } catch (error) {
      console.log("Error in handleLogout: ", error);
    }
  };

  // Filter users based on search term
  const filteredUsers = otherUsers?.otherUsers?.filter((user) =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col w-80 h-full bg-gradient-to-b from-indigo-800 via-purple-700 to-blue-800 text-white shadow-lg rounded-xl">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-md focus-within:ring-2 focus-within:ring-blue-400">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search user"
            className="flex-grow text-gray-700 bg-transparent focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Chat Users Section */}
      <div className="flex-1 overflow-y-auto">
        <AllOtherUsers users={filteredUsers} />
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleUserLogout}
          className="w-full py-2 text-center bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default LeftSidebar;
