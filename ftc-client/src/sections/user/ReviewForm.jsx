import { PenLine, Star, X } from "lucide-react";
import { useState } from "react";
import Button from "../../components/ui/Button";
import { toast } from "sonner";
import axios from "axios";
import { BouncingDots } from "../../components/ui/Loader";

const ReviewForm = ({ setShowAddReviewForm }) => {
  
  const [ratings, setRatings] = useState(2);
  const [review, setReview] = useState({
    name: "", review: "", role: "Parent", ratings
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/review`, review);

    } catch (err) {
      const error = err.response?.data?.error || err.message;
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    if (loading) return;
    const { name, value } = e.target;
    setReview(prev => (
      { ...prev, [name]: value }
    ));
  };

  return (
    <div className="fixed flex inset-0 z-10 bg-black/50 justify-center items-center">
      <div className="max-w-2xl rounded-xl bg-white border border-gray-400 shadow p-5">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex justify-between items-center gap-3">
            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-2 font-semibold text-2xl">
                <PenLine className="text-red-500" />
                Add a Review
              </span>
              <p className="text-gray-500 text-sm">
                Write your opinion about Finna Tuition Centre
              </p>
            </div>
            <div
              className="hover:bg-sky-100 rounded-md cursor-pointer p-1 mb-5 transition-all duration-200"
              onClick={() => setShowAddReviewForm(false)}
            >
              <X className="text-gray-500 size-5 mt-1" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-semibold text-sm ms-2">Name *</label>
              <input
                type="text" name="name" id="name"
                value={review.name} onChange={handleInputChange}
                className="rounded-lg outline-1 p-2 outline-gray-200"
                placeholder="Enter Name"
                autoComplete="name"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="role" className="font-semibold text-sm ms-2">You are *</label>
              <select
                name="role" id="role"
                value={review.role} onChange={handleInputChange}
                className="rounded-lg outline-1 p-2 outline-gray-200"
              >
                <option value="Parent">Parent</option>
                <option value="Student">Student</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="review" className="font-semibold text-sm ms-2">Review *</label>
            <textarea
              type="text" name="review" id="review"
              value={review.review} onChange={handleInputChange}
              className="rounded-lg outline-1 p-2 outline-gray-200"
              rows={4}
              required
            />
            <p className="text-xs text-gray-400 text-end me-2">{review.review.length}/500</p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-sm ms-2">Ratings *</span>
            <div className="flex ms-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className={star < ratings ? "fill-amber-400 text-amber-500" : "text-gray-500"} onClick={() => setRatings(star + 1)} />
              ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row-reverse gap-3 justify-center">
            <Button variant="contained" size="sm" 
              type="submit" disabled={loading} 
              className="flex-1"
            >{loading ? "Submitting" : "Submit"}&nbsp;&nbsp;{loading && <BouncingDots />}</Button>
            <Button 
              variant="outlined" size="sm" 
              onClick={() => setShowAddReviewForm(false)} className="flex-1" 
              disabled={loading}
            >Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReviewForm;