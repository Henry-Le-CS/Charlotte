'use strict'

import mongoose from "mongoose"

const _SECONDS = 5000
export default new class CheckConnection {
    countConnections() { 
        const numConnections = mongoose.connections.length
        console.log(`Number of connections: ${numConnections}`)
    }
    checkOverLoads() {
        setInterval(() => {
            const numConnections = mongoose.connections.length
            const numCores = os.cpus().length
            const memoryUsage = process.memoryUsage().rss

            const maxConnections = numCores * 5
            console.log(`Activate Connection: ${numConnections}`)
            console.log(`Memory Usage: ${memoryUsage / 1024 / 1024} MB`)

            if (numConnections > maxConnections) {
                console.log(`Max Connection reached: ${maxConnections}`)
                process.exit(1)
            }
        }, _SECONDS)
    }
}