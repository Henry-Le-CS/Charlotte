import express from 'express'
import ChatRoutes from './Chat.js'
import MessagesRoutes from './Messages.js'
import User from './User.js'
const router = express.Router()


const publicRoutes = [
    { path: '/user', entry: User},
    { path: '/chat', entry: ChatRoutes },
    { path: '/messages', entry: MessagesRoutes}
]

publicRoutes.forEach(route => {
    router.use(route.path, route.entry);
})
export default router