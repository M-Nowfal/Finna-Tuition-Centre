import ReviewCard from "../../components/cards/ReviewCard";

const Reviews = () => {
  const reviews = [
    {
      name: "Mohammed Irfan",
      role: "Student",
      review: "FTC transformed my daughter's approach to learning. The personalized attention and quality teaching made all the difference.",
      rating: 3,
    },
    {
      name: "Mohammed Fariz",
      role: "Student",
      review: "The teachers at FTC made complex topics easy to understand. I improved my grades significantly!",
      rating: 4,
    },
    {
      name: "Asanar Apsal",
      role: "Student",
      review: "Professional, caring, and results-driven. FTC is the best investment in my child's education.",
      rating: 5,
    },
  ];

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
          {reviews.map((review, index) => (
            <ReviewCard
              key={index}
              rating={review.rating}
              review={review.review}
              name={review.name}
              role={review.role}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
