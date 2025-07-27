import axios from "axios";
import { useEffect, useState } from "react";
import ReviewCard from "../components/cards/ReviewCard";
import { PenLine } from "lucide-react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Button from "../components/ui/Button";
import ReviewForm from "../sections/user/ReviewForm";

const Review = () => {

  const { setHome } = useOutletContext();
  const [reviews, setReviews] = useState([]);
  const [showAddReviewForm, setShowAddReviewForm] = useState(false);
  const navigate = useNavigate();

  const getReviews = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/allreviews`);
      setReviews(res.data.reviews || []);
    } catch (err) {
      const error = err.response?.data?.error || err.message;
      console.log(error);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <div className="m-5">
      <div className="flex gap-2 items-center mb-5">
        <PenLine className="text-emerald-500" />
        <span className="font-semibold text-2xl">All reviews</span>
      </div>
      <span className="text-gray-700">Total Reviews : {reviews.length}</span>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
        {reviews.map((review, i) => (
          <ReviewCard
            key={i}
            rating={review.ratings}
            review={review.review}
            name={review.name}
            role={review.role}
          />
        ))}
      </div>
      <div className="flex flex-col sm:flex-row-reverse justify-center mt-5 gap-5">
        <Button variant="contained" size="sm" onClick={() => setShowAddReviewForm(true)}>Add a Review</Button>
        <Button variant="outlined" size="sm" onClick={() => {
          setHome(true);
          navigate("/");
        }}>Home</Button>
      </div>
      {showAddReviewForm && <ReviewForm
        setShowAddReviewForm={setShowAddReviewForm}
        setReviews={setReviews}
      />}
    </div>
  );
}

export default Review;