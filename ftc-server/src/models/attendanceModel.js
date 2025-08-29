import mongoose from "mongoose";

// attenadnce schema creation
const attendanceSchema = new mongoose.Schema({
  std: { type: Number, enum: [9, 10, 11, 12], required: true },
  section: { type: String, enum: ["A", "B", "C"] },
  date: { type: String, required: true },
  attendance: { type: String, required: true }
});

// model for attendance
const attendanceModel = mongoose.models.Attendance || mongoose.model("Attendance", attendanceSchema);

// export attendanceModel
export default attendanceModel;
