import { Server } from 'socket.io';
import app from './src/app.js';
import userService from './src/services/user.service.js';
const port = process.env.DEV_APP_PORT
// Start the server
const server = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
// io server
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000', 'https://charlotte.io.vn'],
        credentials: true
    }
});
export const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId != "undefined") userSocketMap[userId] = socket.id;
    // Listen for custom events

    // io.emit() is used to send events to all the connected clients
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // Handle disconnections
    socket.on("disconnect", async () => {
		await userService.offlineUser(userId)
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});
// Graceful shutdown on SIGINT (Ctrl+C)
process.on('SIGINT', () => {
    console.log('SIGINT signal received. Shutting down gracefully...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0); // Exit process after server is closed
    });
});

// You can also handle other signals if necessary (e.g., SIGTERM for Kubernetes/PM2):
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received. Shutting down gracefully...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

export default io