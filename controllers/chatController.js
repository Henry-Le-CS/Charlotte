import ChatMoel from '../models/Chat.js'

const CreateChat = async (req, res) => {
    const newChat = new ChatMoel({
        members: [req.body.senderID, req.body.receiverID]
    })
    try {
        const results = await newChat.save()
        res.status(200).json(results)
    } catch (error) {
        res.status(500).send({ message: `Create chat fail ${error}` })
    }
}

const FindChat = async (req, res) => {
    try {
        const findChat = new ChatMoel.find({
            members: {$in: [req.params.id]}
        })
        res.status(200).json(findChat)
    } catch (error) {
        res.status(500).send({ message: `Chat finding failed ${error}` })
    }
}
export {
    CreateChat,
    FindChat
}
