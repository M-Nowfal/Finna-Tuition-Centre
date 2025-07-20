import studentModel from "../models/studentModel";

// api/student/profile/:id
export const getProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const profile = await studentModel.findById(id);
    if (!profile)
      return res.status(200).json({ message: "Student not found" });
    res.status(200).json({ message: "Profile fetched", profile }); 
  } catch (err) {
    next(err);
  }
};  

