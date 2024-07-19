import mongoose from "mongoose";

const connecDB=async ()=>{
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully connected to MongoDB👍")
  } catch (error) {
    console.log(`ERROR: ${error.message}`)
    process.exit(1);
  }
}

export default connecDB;