import express from "express";

// creation of student router
const router = express.Router();

// student routes
router.route("/profile/:id").get();

// export student router
export default router;