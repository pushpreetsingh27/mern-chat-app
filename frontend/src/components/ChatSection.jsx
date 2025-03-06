// ChatSection.jsx
import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Messages from "./Messages";
import useGetMessages from "../hooks/useGetMessages";
import SendInputMessage from "./sendInputMessage";
import useGetRealTimeMessage from "../hooks/useGetRealTimeMessage";

const ChatSection = () => {
    useGetMessages();
    useGetRealTimeMessage();
    const messagesEndRef = useRef(null);

    const { messages } = useSelector((store) => store.message);
    const { selectedUser, onlineUsers } = useSelector((store) => store.user);

    const isOnline = onlineUsers?.includes(selectedUser?._id);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return selectedUser !== null ? (
        <div className="flex flex-col h-full w-full bg-white shadow-lg rounded-xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md">
                <div className="flex items-center space-x-4">
                    <div className={`avatar ${isOnline ? "online" : ""}`}>
                        <div className="w-14 h-14 rounded-full border-3 border-white">
                            <img
                                src={selectedUser?.profilePhoto}
                                alt="User"
                                className="object-cover w-full h-full rounded-full"
                            />
                        </div>
                    </div>
                    <div>
                        <p className="text-xl font-bold">{selectedUser?.fullName}</p>
                        <p className={`text-sm ${isOnline ? 'text-green-300' : 'text-gray-300'}`}>
                            {isOnline ? "Online" : "Offline"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Messages Section */}
            <div 
                className="flex-1 overflow-y-auto p-6 bg-gray-50"
                style={{
                    backgroundImage: 'linear-gradient(to bottom, rgba(229, 231, 235, 0.5), rgba(229, 231, 235, 0.5))',
                    backgroundBlendMode: 'overlay'
                }}
            >
                <div className="flex flex-col w-full">
                    {messages && messages.length > 0 ? (
                        messages.map((message) => (
                            <Messages key={message._id} message={message} />
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
                            <p className="text-xl font-semibold">No messages yet</p>
                            <p className="text-sm text-gray-400">
                                Start a conversation with {selectedUser?.fullName}
                            </p>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input Section */}
            <div className="p-4 bg-white border-t">
                <SendInputMessage />
            </div>
        </div>
    ) : (
        <div className="flex items-center justify-center w-[500px] h-full bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            <div className="text-center space-y-4">
                <p className="text-2xl font-bold">Select a Chat</p>
                <p className="text-sm opacity-70">Choose a contact to start messaging</p>
            </div>
        </div>
    );
};

export default ChatSection;