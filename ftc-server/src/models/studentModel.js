import mongoose, { model, Schema } from "mongoose";

// student schema creation
const studentSchema = new Schema({
  name: { type: String, required: true },
  roll_no: { type: String },
  std: { type: String, enum: ["9", "10", "11", "12"] },
  section: { type: String, enum: ["A", "B", "C", "D"]},
  join_date: { type: Date, required: true, default: new Date() },
  parent: { type: String, required: true },
  phone: { type: String, required: true },
  feeRupee: { type: String },
  feeStatus: { type: Boolean, default: false },
  feeMonth: { type: String, enum: [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ] }
}, { timestamps: true });

// creation of student model
const studentModel = mongoose.models.Student || model("Student", studentSchema);

// export student model
export default studentModel;