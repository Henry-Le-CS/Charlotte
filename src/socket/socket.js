import { userSocketMap } from "../../server.js";

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};
