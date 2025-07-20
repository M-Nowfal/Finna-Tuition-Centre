
// api/auth/login/:role
export const loginAuthentication = async (req, res, next) => {
  try {
    const { role } = req.params;
    const { password } = req.body;

    switch (role) {
      case "staff":
        if (password === process.env.FTC_STAFF_PASS)
          return res.status(200).json({ message: "Login Success" });
        return res.status(409).json({ error: "Invalid credentials, please check your Reg:No and Password" });
      case "student":
      // will be add in future
      case "admin":
      // will be add in future
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
    const { name, phone, password } = req.body;
    // store staff in data base
    res.status(201).json({ message: "Staff created" });
  } catch (err) {
    next(err);
  }
};