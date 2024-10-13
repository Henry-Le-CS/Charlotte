import https from 'https';
import { Server } from 'socket.io';
import app from './src/app.js';
import fs from 'fs';
import userService from './src/services/user.service.js';
const port = process.env.DEV_APP_PORT

// SSL KEY
const privateKey = fs.readFileSync('/etc/letsencrypt/live/cosmetichive.id.vn/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/cosmetichive.id.vn/fullchain.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate, rejectUnauthorized: true, secure : true };
// Create an HTTPS server
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => {
    console.log(`Socket.io server is running on port ${port} with HTTPS`);
}).on('error', (err) => {
    console.error('Failed to start server:', err);
});

// io server
const io = new Server(httpsServer, {
  cors: {
    origin: ['*'],
    methods: ["GET", "POST"],
    credentials: true
  }
});

export const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
    console.log('A user connected to the socket');
    const userId = socket.handshake.query.userId;

    // Ensure userId is valid
    if (userId) {
        userSocketMap[userId] = socket.id;
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }

    // Handle disconnections
    socket.on("disconnect", async () => {
        if (userId) {
            await userService.offlineUser(userId);
            delete userSocketMap[userId];
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        }
    });
});

// Graceful shutdown on SIGINT (Ctrl+C)
process.on('SIGINT', () => {
    console.log('SIGINT signal received. Shutting down gracefully...');
    httpsServer.close(() => {
        console.log('Server closed');
        process.exit(0); // Exit process after server is closed
    });
});

// You can also handle other signals if necessary (e.g., SIGTERM for Kubernetes/PM2):
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received. Shutting down gracefully...');
    httpsServer.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

export default io;
