

// message.model.js
const MessageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    status: { type: String, default: 'sent' }  // sent, delivered, read
});

export default mongoose.model('Message', MessageSchema);