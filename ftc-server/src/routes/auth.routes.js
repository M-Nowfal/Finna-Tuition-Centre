import express from "express";
import { loginAuthentication } from "../controllers/auth.js";

// creation of router
const router = express.Router();

// auth routes
router.route("/login/:role").post(loginAuthentication);

// export auth router
export default router;