import express from "express";
import { loginAuthentication } from "../controllers/auth.js";

const router = express.Router();

router.route("/login/:role").post(loginAuthentication);

export default router;