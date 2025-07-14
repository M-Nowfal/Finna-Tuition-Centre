import dotenv from "dotenv";
import app from "./app.js";
import connectDataBase from "./config/dbconnect.js";

// Config .env to get the values from .env file
dotenv.config();

// Define port number
const PORT = process.env.PORT || 3000;

// Data Base connection
/* connectDataBase()
  .then((message) => {
    console.log(message);

    // After connected to the data base start the server
    app.listen(PORT, () => {
      console.log(`Server is Running at http://localhost/${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  }); */

app.listen(PORT, () => {
  console.log(`Server is Running at http://localhost/${PORT}`);
});
