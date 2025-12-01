import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    const mongoDBUrl = process.env.MONGODB_URL;

    if (!mongoDBUrl) {
      throw new Error("MongoDB connection string is not defined");
    }
    
    const db = mongoose.connection;
    db.on("error", (error) =>
      console.error("MongoDB connection error:" + error)
    );
    db.once("open", () =>
      console.log(`Connected to MongoDB successfully via: ${mongoDBUrl}`)
    );
    await mongoose.connect(mongoDBUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export default connectToDatabase;
