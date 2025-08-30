import studentModel from "../models/studentModel.js";
import staffModel from "../models/staffModel.js";
import facultyModel from "../models/facultyModel.js";
import bcryptjs from "bcryptjs";

// api/auth/login/:role
export const loginAuthentication = async (req, res, next) => {
  try {
    const { role } = req.params;
    const { password, reg_no, phone, name } = req.body;

    switch (role) {
      case "staff":
        const staff = await staffModel.findOne({ staff_id: reg_no });
        if (!staff)
          return res.status(404).json({ error: "No Staff is registered for the given Reg:No" });
        if (await bcryptjs.compare(password, staff.password))
          return res.status(200).json({ message: "Login Success", staff });
        return res.status(409).json({ error: "Invalid creadentials, please check your Reg:No and Password" });
      case "student":
        const student = await studentModel.findOne({ roll_no: reg_no, phone, name: { $regex: name, $options: "i" } });
        if (student)
          return res.status(200).json({ message: "Login Success", student });
        return res.status(404).json({ error: "Student not found" });
      case "admin":
        return res.status(400).json({ error: "Admin panel is not ready yet" });
      default:
        return res.status(400).json({ error: "Invalid role" });
    };
  } catch (err) {
    next(err);
  }
};

// api/auth/registration post-method
export const registerStaff = async (req, res, next) => {
  try {
    const { name, phone, email, password } = req.body;
    const faculty = await facultyModel.findOne({ number: Number(phone) });
    if (!faculty && phone != process.env.ADMIN_NUMBER)
      return res.status(409).json({ error: "You are not allowed to register as Staff" })
    const staff = await staffModel.findOne({ $or: [{ phone }, { email }] });
    if (staff)
      return res.status(401).json({ error: "Staff already exist with that email or phone" });
    const hashedPassword = await bcryptjs.hash(password, await bcryptjs.genSalt(10));
    const staff_count = await staffModel.countDocuments();
    const staff_id = "FTCSTF" + (staff_count + 1).toString().padStart(2, "0");
    await staffModel.create({
      name, phone, email, password: hashedPassword, staff_id
    });
    return res.status(201).json({ message: "Staff created", staff_id });
  } catch (err) {
    next(err);
  }
};

// api/auth/forgot-password post-method
export const forgotPassword = async (req, res, next) => {
  try {
    const { phone, staff_id } = req.body;
    const staff = await staffModel.findOne({ phone, staff_id });
    if (!staff) 
      return res.status(404).json({ error: "Staff not found with the phone or staff-id" });
    res.status(200).json({ id: staff._id });
  } catch (err) {
    next(err);
  }
};

// api/staff/reset-password post-method
export const resetPassword = async (req, res, next) => {
  try {
    const { staff_id, password } = req.body;
    const staff = await staffModel.findById(staff_id);
    if (!staff) 
      return res.status(404).json({ error: "Staff not found" });
    const hashedPassword = await bcryptjs.hash(password, await bcryptjs.genSalt(10));
    await staffModel.findByIdAndUpdate(staff_id, {
      $set: { password: hashedPassword }
    });
    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    next(err);
  }
};

// api/auth/add-admin post-method
export const addAdmin = async (req, res, next) => {
  try {
    const {staffId} = req.body;
    const staff = await staffModel.findOne({ staff_id: staffId });
    if (!staff) 
      return res.status(404).json({ error: "Staff not found" });
    await staffModel.findOneAndUpdate({ staff_id: staffId }, {
      $set: { admin: true }
    });
    res.status(200).json({ message: "New Admin Added" });
  } catch (err) {
    next(err);
  }
};

// api/auth/add-staff post-method
export const addStaff = async (req, res, next) => {
  try {
    const { staffNumber } = req.body;
    const faculty = await facultyModel.findOne({ number: staffNumber });
    if (faculty) 
      return res.status(400).json({ error: "Staff already added" });
    await facultyModel.create({ number: staffNumber });
    res.status(201).json({ message: "Staff Added" });
  } catch (err) {
    next(err);
  }
};
