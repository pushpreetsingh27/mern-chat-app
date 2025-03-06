import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";

const useGetOtherUser = () => {
  const dispact = useDispatch();

  const fetchOtherUsers = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.get(
        "http://localhost:8000/api/user/getotherusers"
      );

      dispact(setOtherUsers(response.data));
    } catch (err) {
      console.error("Error in fetching other users", err);
    }
  };

  useEffect(() => {
    fetchOtherUsers();
  }, []);


};

export default useGetOtherUser;
