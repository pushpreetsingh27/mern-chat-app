import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetMessages = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);

  const fetchMessages = async () => {
    if (!selectedUser?._id) {
      console.log("No selected user to fetch messages for.");
      dispatch(setMessages([])); // Clear messages when no user is selected
      return;
    }

    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(
        `http://localhost:8000/api/message/${selectedUser._id}`
      );
      dispatch(setMessages(response.data || [])); // Ensure data is always an array

    } catch (error) {
      console.error("Error fetching messages:", error.response || error.message);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedUser?._id]); // Only trigger when the selected user's ID changes
};

export default useGetMessages;
