import { useEffect, useState } from "react";
import ReviewCard from "../../components/cards/ReviewCard";
import Button from "../../components/ui/Button";
import axios from "axios";
import { Link } from "react-router-dom";

const Reviews = ({ setHome }) => {

  const [reviews, setReviews] = useState([]);

  const getReviews = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/review`);
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
    <section id="reviews" className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Students Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real stories from students and parents who experienced success with us
          </p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {reviews.map(review => (
            <ReviewCard
              key={review._id}
              rating={review.ratings}
              review={review.review}
              name={review.name}
              role={review.role}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <Link to="reviews">
          <Button variant="outlined" onClick={() => setHome(false)}>All reviews</Button>
        </Link>
      </div>
    </section>
  );
};

export default Reviews;
