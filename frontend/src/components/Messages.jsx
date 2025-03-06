// Messages.jsx
import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Messages = ({ message }) => {
    const scroll = useRef();
    const { authUser, selectedUser } = useSelector(store => store.user);

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);


    const isCurrentUser = authUser?._id === message?.senderId;

    return (
        <div 
            ref={scroll} 
            className="w-full flex flex-col mb-4"
        >
            <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} w-full`}>
                <div className={`flex max-w-[80%] ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'} items-end gap-2`}>
                    <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                            <img 
                                src={isCurrentUser ? authUser?.profilePhoto : selectedUser?.profilePhoto} 
                                alt="Avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    
                    <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
                        <div className={`px-4 py-2 rounded-2xl ${
                            isCurrentUser 
                                ? 'bg-blue-500 text-white rounded-br-none' 
                                : 'bg-gray-200 text-gray-800 rounded-bl-none'
                        }`}>
                            {message?.message && <p className="break-words">{message.message}</p>}
                            {message?.media && (
                                <img 
                                    src={message.media} 
                                    alt="Media" 
                                    className="max-w-full max-h-48 object-cover rounded-lg mt-2" 
                                />
                            )}
                        </div>
                        <span className="text-xs text-gray-500 mt-1">
                            {message?.createdAt ? new Date(message.createdAt).toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                            }) : ''}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messages;