import mongoose from "mongoose";

// staff schema creation
const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  staff_id: { type: String, required: true }
}, { timestamps: true });

// staff model creation
const staffModel = mongoose.models.Staff || mongoose.model("Staff", staffSchema);

// export staff model
export default staffModel;