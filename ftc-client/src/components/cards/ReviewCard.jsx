import { Star } from "lucide-react";

const ReviewCard = ({ rating, review, name, role }) => {
  return (
    <div className="p-3 border border-sky-100/30 text-black bg-sky-100/10 rounded-2xl shadow hover:shadow-lg hover:bg-sky-200/30 transition-all duration-100">
      <div className="flex flex-col gap-3 justify-center py-3">
        <div className="flex">
          {Array.from({ length: rating }, (_, i) => <Star key={i} className="text-yellow-500 fill-yellow-300" />)}
        </div>
        <i className="text-md text-gray-900/80">
          "{review}"
        </i>
        <span className="text-xl font-semibold">{name}</span>
        <span className="text-xl font-semibold text-sky-600">{role}</span>
      </div>
    </div>
  );
};

export default ReviewCard;