import studentModel from "../models/studentModel.js";

// api/auth/login/:role
export const loginAuthentication = async (req, res, next) => {
  try {
    const { role } = req.params;
    const { password, reg_no, phone, name } = req.body;

    switch (role) {
      case "staff":
        if (password === process.env.FTC_STAFF_PASS)
          return res.status(200).json({ message: "Login Success" });
        return res.status(409).json({ error: "Invalid credentials, please check your Reg:No and Password" });
      case "student":
        const student = await studentModel.findOne({ roll_no: reg_no, phone, name: { $regex: name, $options: "i" } });
        if (student)
          return res.status(200).json({ message: "Login Success", student });
        return res.status(404).json({ error: "Student not found" });
      case "admin":
        return res.status(200).json({ message: "Admin panel is not ready yet" });
      default:
        res.status(400).json({ error: "Invalid role" });
    };
  } catch (err) {
    next(err);
  }
};

// api/staff/registration post-method
export const registerStaff = async (req, res, next) => {
  try {
    const { name, phone, email, password } = req.body;
    // 
    res.status(201).json({ message: "Staff created" });
  } catch (err) {
    next(err);
  }
};