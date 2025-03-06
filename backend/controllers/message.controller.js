import Message from '../models/message.model.js';
import Conversation from '../models/conversation.model.js';
import { getReceiverSocketId, io } from '../socket/socket.js';

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { message } = req.body;

    // Handle file upload and get the media URL (if available)
    let mediaUrl = null;
    if (req.file) {
      mediaUrl = req.file.path; // The media URL from Cloudinary after upload
    }

    // Check if either message or media is present
    if (!message && !mediaUrl) {
      return res.status(400).json({ message: "No content to send" });
    }

    // Check if a conversation already exists between the sender and receiver
    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // If conversation doesn't exist, create a new one
    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Create the new message, including the media URL if any
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message: message || '', // Empty string if no message
      media: mediaUrl, // Store the media URL (if any)
    });

    // Add the new message to the conversation's message array
    if (newMessage) {
      gotConversation.messages.push(newMessage._id);
    }
    await gotConversation.save();

    // Emit the new message to the receiver's socket for real-time update
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', newMessage);
    }

    // Respond with the newly created message
    return res.status(201).json({ newMessage });
  } catch (error) {
    console.log('Error in send message controller', error);
    res.status(500).json({ message: error.message });
  }
};

export const getMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;

    // Retrieve the conversation and populate the messages with sender/receiver info
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate({
      path: 'messages',
      populate: { path: 'senderId receiverId', select: 'username profilePicture' },
    });

    return res.status(201).json(conversation?.messages);
  } catch (error) {
    console.log('Error in get message controller', error);
    res.status(500).json({ message: error.message });
  }
};
