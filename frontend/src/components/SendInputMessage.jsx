import axios from "axios";
import React, { useState, useRef } from "react";
import { IoSend, IoImageOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";
import EmojiPicker from 'emoji-picker-react';

const SendInputMessage = () => {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const imageInputRef = useRef(null);
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    // Ensure either message or image is present
    if (!message.trim() && !selectedImage) return;

    try {
      const formData = new FormData();
      
      // Only append message if it exists
      if (message.trim()) {
        formData.append('message', message);
      }
      
      // Add image if selected
      if (selectedImage) {
        formData.append('media', selectedImage);
      }

      const response = await axios.post(
        `http://localhost:8000/api/message/send/${selectedUser?._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      dispatch(setMessages([...messages, response?.data?.newMessage]));
      
      // Reset states
      setMessage("");
      setSelectedImage(null);
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleEmoji = (e) => {
    setMessage((prev) => prev + e.emoji);
    setOpen(false);
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-2xl shadow-2xl"
    >
      {/* Image upload input (hidden) */}
      <input 
        type="file" 
        ref={imageInputRef}
        accept="image/*" 
        className="hidden" 
        onChange={handleImageUpload} 
      />

      {/* Image preview */}
      {selectedImage && (
        <div className="relative mr-2">
          <img 
            src={URL.createObjectURL(selectedImage)} 
            alt="Preview" 
            className="w-16 h-16 object-cover rounded-lg shadow-lg" 
          />
          <button 
            type="button"
            onClick={() => {
              setSelectedImage(null);
              if (imageInputRef.current) {
                imageInputRef.current.value = "";
              }
            }}
            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700 transition duration-300"
          >
            ×
          </button>
        </div>
      )}

      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md transition duration-300 ease-in-out"
        />

        <div className="absolute top-2.5 right-12 mr-2 cursor-pointer">
          <IoImageOutline 
            size={24} 
            onClick={() => imageInputRef.current.click()} 
            className="text-gray-500 hover:text-blue-500 transition-transform duration-200"
          />
        </div>

        <div className="absolute top-2 right-3 cursor-pointer">
          <img
            className="w-8"
            src="./emoji.webp"
            alt="emoji"
            onClick={() => setOpen((prev) => !prev)}
          />
          {open && (
            <div className="absolute bottom-full right-0 z-50 mb-2">
              <EmojiPicker open={open} onEmojiClick={handleEmoji} />
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={!message && !selectedImage}
        className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition duration-200 ease-in-out disabled:opacity-50 shadow-lg hover:scale-105"
      >
        <IoSend size={22} />
      </button>
    </form>
  );
};

export default SendInputMessage;
