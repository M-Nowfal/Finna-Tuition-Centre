import express from "express";
import {
  addStudent, feesPayment, getAllStudents, getStudent,
  getTotalStudents,
  recentStudents, removeStudent, updateStaff, updateStudent
} from "../controllers/staff.js";
import { registerStaff } from "../controllers/auth.js";

// creation of staff router
const router = express.Router();

// staff routes
router.route("/gettotalstudents").get(getTotalStudents);
router.route("/getstudents/:std").get(getAllStudents);
router.route("/student").get(getStudent).post(addStudent).delete(removeStudent);
router.route("/update").put(updateStudent);
router.route("/registration").post(registerStaff);
router.route("/recentstuds").get(recentStudents);
router.route("/payment").post(feesPayment);
router.route("/update-stf").put(updateStaff);

// export staff router
export default router;