import MessageModel from "../src/models/Messages.js";

const SendMessage = async (req, res) => {
    const message = new MessageModel({
        chatID: req.body.chatID,
        senderID: req.body.senderID,
        text: req.body.text
    })
    try {
        const results = await message.save()
        res.status(200).send(results)
    } catch (error) {
        res.status(500).send({ message: 'Message fail on sending'})
    }
}

const FindMessages = async (req, res) => {
    const id = req.params
    try {
        const results = await MessageModel.find({ id })
        res.status(200).json(results)
    } catch (error) {
        res.status(500).send({ message: `Message finding failed ${error}` })
    }
}
export {
    FindMessages, SendMessage
};

