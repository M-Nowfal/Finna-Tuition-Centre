import studentModel from "../models/studentModel.js";
import staffModel from "../models/staffModel.js";
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
        return res.status(200).json({ message: "Admin panel is not ready yet" });
      default:
        return res.status(400).json({ error: "Invalid role" });
    };
  } catch (err) {
    next(err);
  }
};

// api/staff/registration post-method
export const registerStaff = async (req, res, next) => {
  try {
    const { name, phone, email, password } = req.body;
    const staff = await staffModel.findOne({ phone, email });
    if (staff)
      return res.status(401).json({ error: "Staff already exist with that email or phone" });
    const hashedPassword = await bcryptjs.hash(password, await bcryptjs.genSalt(10));
    const staff_count = await staffModel.countDocuments();
    const staff_id = "FTCSTF" + (staff_count + 1).toString().padStart(2, "0");
    await staffModel.create({
      name, phone, email, password: hashedPassword, staff_id
    });
    return res.status(201).json({ message: "Staff created" });
  } catch (err) {
    next(err);
  }
};