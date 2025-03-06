import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedUsers } from "../redux/userSlice";
import useGetOtherUser from "../hooks/useGetOtherUser";

const AllOtherUsers = ({ users }) => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);

  useGetOtherUser();
  const { onlineUsers } = useSelector((store) => store.user);

  const handleSelectedUser = (user) => {
    dispatch(setSelectedUsers(user));
  };

  return (
    <div className="space-y-4 cursor-pointer flex-1">
      {users?.map((user) => {
        // Check if the user is online
        const isOnline = onlineUsers?.includes(user?._id);

        return (
          <div
            key={user?._id}
            className={`${
              selectedUser?._id === user?._id ? "bg-slate-400" : ""
            } flex items-center gap-2 py-1`}
            onClick={() => handleSelectedUser(user)}
          >
            <div className={`avatar ${isOnline ? "online" : ""}`}>
              <div className="w-12 rounded-full ml-4">
                <img
                  src={user.profilePhoto}
                  alt={`${user.fullName}' avatar`}
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <p className="text-xl font-semibold">{user.fullName}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllOtherUsers;
