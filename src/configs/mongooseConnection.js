import mongoose from "mongoose"
mongoose.set('strictQuery', false)

async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
        console.log('Charlotte connected to MongooDB Server')
    } catch (err) {
        console.log('Charlotte connect failed to MongooDB Server')
    }
}

export default connect