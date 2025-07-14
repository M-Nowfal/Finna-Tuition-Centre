import { connect } from "mongoose";

const connectDataBase = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await connect(process.env.MONGO_URI);
      resolve("DataBase connected successfully!");
    } catch (err) {
      reject(err);
    }
  });
};

export default connectDataBase;
