import mongoose from "mongoose";

// creation of reviewSchema
const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  review: { type: String, required: true },
  role: { type: String, required: true, enum: ["Student", "Parent"] },
  ratings: { type: Number, enum: [1, 2, 3, 4, 5], default: 5 }
}, { timestamps: true });

// creation of reviewModel
const reviewModel = mongoose.models.Review || mongoose.model("Review", reviewSchema);

// export reviewModel
export default reviewModel;