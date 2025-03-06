import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    media: { // New field to store media URL (image or video)
        type: String,
    }
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

export default Message;
