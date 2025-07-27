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
  feeMonth: { type: Number, enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
  feePaidDate: { type: String },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

// creation of student model
const studentModel = mongoose.models.Student || model("Student", studentSchema);

// export student model
export default studentModel;