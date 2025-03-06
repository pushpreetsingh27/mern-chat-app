import {Server} from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin:['http://localhost:5173'],
        methods:['GET', 'POST'],
    },
});

export const getReceiverSocketId = (receiverId) =>{
    return userSocketMap[receiverId]
}

const userSocketMap = {}


io.on('connection', (socket) => {
    console.log("User connected with socket ID:", socket.id); // Log the connected socket ID

    const userId = socket.handshake.query.userId;
    console.log("User ID from handshake query:", userId); // Log the userId passed during connection

    if (userId !== undefined) {
        userSocketMap[userId] = socket.id;
    }
    console.log("Updated User Socket Map after connection:", userSocketMap); // Log the current userSocketMap

    // Emit online users
    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('disconnect', () => {
        console.log("User disconnected with socket ID:", socket.id); // Log the disconnected socket ID
        console.log("User Socket Map before deletion:", userSocketMap); // Log map before deletion

        delete userSocketMap[userId];
        console.log("Updated User Socket Map after disconnection:", userSocketMap); // Log map after deletion

        // Emit updated online users
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
});


export {app, io, server};
