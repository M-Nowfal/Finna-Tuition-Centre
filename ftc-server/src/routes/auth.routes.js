import express from "express";
import { addAdmin, addStaff, forgotPassword, loginAuthentication, resetPassword } from "../controllers/auth.js";

// creation of router
const router = express.Router();

// auth routes
router.route("/login/:role").post(loginAuthentication);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").post(resetPassword);
router.route("/add-admin").post(addAdmin);
router.route("/add-staff").post(addStaff);

// export auth router
export default router;
