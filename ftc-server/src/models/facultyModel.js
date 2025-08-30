import mongoose from "mongoose";

// create faculty schema 
const facultySchema = new mongoose.Schema({
  number: { type: Number, required: true }
});

// model for faculty
const facultyModel = mongoose.models.Faculty || mongoose.model("Faculty", facultySchema);

// export facultyModel
export default facultyModel;
