import mongoose from "mongoose";
import { MongoClient, ServerApiVersion } from 'mongodb';
const connectDB=async ()=>{




// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



  try {
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    console.log("Successfully connected to MongoDB👍")
  } catch (error) {
    console.log(`ERROR: ${error.message}`)
    process.exit(1);
  }
}

export default connectDB;


