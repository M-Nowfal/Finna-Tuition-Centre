import express from "express";
import { addReview, getAllReviews, getReviews } from "../controllers/user.js";

// creatiopn of user router
const router = express.Router();

// user routes
router.route("/review").get(getReviews).post(addReview);
router.route("/allreviews").get(getAllReviews);

// export user route
export default router;