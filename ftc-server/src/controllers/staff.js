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
      const stud_count = await studentModel.countDocuments({ std: studentDetails.std });
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