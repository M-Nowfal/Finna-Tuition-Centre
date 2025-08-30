import mongoose from "mongoose";

// attenadnce schema creation
const attendanceSchema = new mongoose.Schema({
  std: { type: String, required: true },
  details: {
    date: { type: String, required: true },
    day: { type: String, required: true },
    subject: { type: String, required: true },
    no_on_roll: { type: Number, required: true },
    no_of_present: { type: Number, required: true },
    no_of_absent: { type: Number, required: true },
  },
  absentees: []
});

// model for attendance
const attendanceModel = mongoose.models.Attendance || mongoose.model("Attendance", attendanceSchema);

// export attendanceModel
export default attendanceModel;
