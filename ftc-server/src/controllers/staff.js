import staffModel from "../models/staffModel.js";
import studentModel from "../models/studentModel.js";

// api/staff/getTotalStudents get-method
export const getTotalStudents = async (_req, res, next) => {
  try {
    const students = await studentModel.find();
    res.status(200).json({ message: "Students fetched successfully", students });
  } catch (err) {
    next(err);
  }
};

// api/staff/getstudents get-method
export const getAllStudents = async (req, res, next) => {
  try {
    const { std } = req.params;
    const students = await studentModel.find({ std });
    res.status(200).json({ message: "Students fetched successfully", students });
  } catch (err) {
    next(err);
  }
};

// api/staff/student?id=_id get-method
export const getStudent = async (req, res, next) => {
  try {
    const { id } = req.query;
    const student = await studentModel.findById(id);
    res.status(200).json({ message: "Student fetched successfully", student });
  } catch (err) {
    next(err);
  }
};

// api/staff/student post-method
export const addStudent = async (req, res, next) => {
  try {
    const studentDetails = req.body;
    let roll_no = "";
    if (studentDetails.feeStatus) {
      const stud_count = await studentModel.countDocuments({ std: studentDetails.std, roll_no: { $ne: "" } });
      const year = new Date().getFullYear().toString().slice(-2);
      roll_no = year + "FTC" + studentDetails.std + (stud_count + 1).toString().padStart(2, "0");
    }
    const student = await studentModel.create({
      ...studentDetails, roll_no
    });
    res.status(201).json({ message: "Student added successfully", student_id: student._id, roll_no });
  } catch (err) {
    next(err);
  }
};

// api/staff/update put-method
export const updateStudent = async (req, res, next) => {
  try {
    const updatedDetails = req.body;
    await studentModel.findByIdAndUpdate(updatedDetails._id, {
      ...updatedDetails
    });
    res.status(201).json({ message: "Student updated successfully" });
  } catch (err) {
    next(err);
  }
};

// api/staff/student delete-method
export const removeStudent = async (req, res, next) => {
  try {
    const { id } = req.body;
    await studentModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Student removed successfully" });
  } catch (err) {
    next(err);
  }
};

// api/staff/recentstuds get-method
export const recentStudents = async (_req, res, next) => {
  try {
    const recentStudents = await studentModel.find().sort({ _id: -1 }).limit(10);
    res.status(200).json({ message: "Recent students fetched", recentStudents });
  } catch (err) {
    next(err);
  }
};

// api/staff/payment post-method
export const feesPayment = async (req, res, next) => {
  const months = {
    "January": 1, "February": 2, "March": 3, "April": 4, "May": 5, "June": 6,
    "July": 7, "August": 8, "September": 9, "October": 10, "November": 11, "December": 12
  }
  try {
    const { _id, roll_no, std, lastFeeMonth, feeRupee } = req.body;
    let newRollNo = roll_no || "";
    if (!roll_no) {
      const stud_count = await studentModel.countDocuments({ std, roll_no: { $ne: "" } });
      const year = new Date().getFullYear().toString().slice(-2);
      newRollNo = year + "FTC" + std + (stud_count + 1).toString().padStart(2, "0");
    }
    await studentModel.findByIdAndUpdate(_id, {
      feeMonth: months[lastFeeMonth],
      feeRupee,
      roll_no: newRollNo
    });
    res.status(200).json({ message: `Fees Paid Successfully for the month ${lastFeeMonth}`, roll_no: newRollNo });
  } catch (err) {
    next(err);
  }
};

// STAFF Related api's

// api/staff/update-stf put-method 
export const updateStaff = async (req, res, next) => {
  try {
    const { details, id } = req.body;
    const updatedDetails = await staffModel.findByIdAndUpdate(id, {
      ...details
    });
    res.status(200).json({ message: "Updated successfully!", updatedDetails });
  } catch (err) {
    next(err);
  }
};