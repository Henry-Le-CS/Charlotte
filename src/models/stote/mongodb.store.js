'use strict'
import MongoDBStore from 'connect-mongodb-session'
import session from 'express-session'
const mongodbStore = MongoDBStore(session)
const store = new mongodbStore({
    uri: process.env.MONGODB_URI
})

export default store