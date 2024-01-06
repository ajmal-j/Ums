import mongoose from "mongoose";

export const connect = async () => {
  try {
    const url: string | undefined = process.env.MONGO_DB_URL;
    if (!url) {
      return console.error("MONGO_DB_URL is undefined");
    }
    await mongoose.connect(url);
    console.log("Mongo DB Connected");
  } catch (error) {
    console.log("Error while connecting Mongodb", error);
  }
};
