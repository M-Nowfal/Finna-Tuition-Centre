import { connect } from "mongoose";

const connectDataBase = async () => {
  try {
    await connect(process.env.MONGO_URI);
    console.log("DataBase connected successfully!");
  } catch (err) {
    console.log("Error while connecting to DB", err.message);
  }
};

export default connectDataBase;
