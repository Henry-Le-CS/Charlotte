import { Server } from 'socket.io';
import app from './src/app.js';
const port = process.env.DEV_APP_PORT

// Start the server
const server = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000', 'https://charlotte.io.vn'],
        credentials: true
    }
});
io.on('connection', (socket) => {
    // Listen for custom events
    socket.on('chat message', (msg) => {
        console.log('Message received:', msg);
        io.emit('chat message', msg);
    });

    // Handle disconnections
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
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