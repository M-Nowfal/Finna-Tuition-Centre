export const loginAuthentication = async (req, res, next) => {
  try {
    const { role } = req.params;
    const { password } = req.body;

    if (role === "staff") {
      if (password === process.env.FTC_STAFF_PASS) 
        return res.status(200).json({ message: "Login Success" });
      return res.status(409).json({ error: "Invalid credentials, please check your Reg:No and Password" });
    }
  } catch (err) {
    next(err);
  }
};