import reviewModel from "../models/reviewMode.js";

// api/user/allreviews get-method
export const getAllReviews = async (_req, res, next) => {
  try {
    const reviews = await reviewModel.find();
    res.status(200).json({ message: "Reviews", reviews });
  } catch (err) {
    next(err);
  }
}

// api/user/review get-method
export const getReviews = async (_req, res, next) => {
  try {
    const reviews = await reviewModel.find({ ratings: { $gte: 4 } }).limit(5);
    res.status(200).json({ message: "Reviews", reviews });
  } catch (err) {
    next(err);
  }
};

// api/user/review post-method
export const addReview = async (req, res, next) => {
  try {
    const review = req.body;
    await reviewModel.create({ ...review });
    res.status(200).json({ message: "Review added successfully" });
  } catch (err) {
    next(err)
  }
};