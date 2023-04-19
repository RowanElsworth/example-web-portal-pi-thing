const { MongoClient } = require('mongodb');

const uri = process.env.DB_URI;
let client; // Declare client as a global variable to hold the MongoDB client instance

const connectToDatabase = async () => {
  client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

async function insertData(collectionName, data) {
  const database = client.db('security-db');
  const collection = database.collection(collectionName);

  try {
    const result = await collection.insertOne(data);
    console.log('Data inserted:', result.insertedId);
    closeDatabaseConnection();
  } catch (err) {
    console.error(err);
    closeDatabaseConnection();
  }
}

// close the MongoDB client connection
const closeDatabaseConnection = () => {
  client.close();
  console.log('MongoDB client connection closed');
};

module.exports = {
  connectToDatabase,
  insertData,
  closeDatabaseConnection,
};
