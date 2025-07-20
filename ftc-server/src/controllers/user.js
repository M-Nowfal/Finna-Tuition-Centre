import reviewModel from "../models/reviewMode.js";

export const getReviews = async (_req, res, next) => {
  try {
    const reviews = await reviewModel.find({ ratings: { $gt: 4 } }).limit(4);
    res.status(200).json({ message: "Reviews", reviews });
  } catch (err) {
    next(err);
  }
};

export const getAllReviews = async (_req, res, next) => {
  try {
    const reviews = await reviewModel.find();
    res.status(200).json({ message: "Reviews", reviews });
  } catch (err) {
    next(err);
  }
}

export const addReview = async (req, res, next) => {
  try {
    const review = req.body;
    await reviewModel.create({ ...review });
    res.status(200).json({ message: "Review added successfully" });
  } catch (err) {
    next(err)
  }
};