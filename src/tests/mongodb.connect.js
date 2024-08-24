import { MongoClient } from 'mongodb';

// Connection URL and Database Name
const url = process.env.MONGODB_URI
const dbName = 'Charlotte';
console.log(url)
async function run() {
    const client = new MongoClient(url, { useUnifiedTopology: true });

    try {
        // Connect to the MongoDB server
        await client.connect();
        console.log("Connected successfully to MongoDB Atlas");

        // Select the database
        const db = client.db(dbName);

        // Select the collection
        const collection = db.collection('Default');

        // Insert a document
        const insertResult = await collection.insertOne({ name: "Test Document", date: new Date() });
        console.log('Inserted document:', insertResult.ops);

        // Find a document
        const findResult = await collection.findOne({ name: "Test Document" });
        console.log('Found document:', findResult);

        // Update a document
        const updateResult = await collection.updateOne({ name: "Test Document" }, { $set: { name: "Updated Document" } });
        console.log('Updated document count:', updateResult.modifiedCount);

        // Delete a document
        const deleteResult = await collection.deleteOne({ name: "Updated Document" });
        console.log('Deleted document count:', deleteResult.deletedCount);
    } catch (err) {
        console.error(err);
    } finally {
        // Close the connection
        await client.close();
    }
}

run().catch(console.dir);
