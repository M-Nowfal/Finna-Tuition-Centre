import { ArrowRight } from "lucide-react";
import Button from "../../components/ui/Button";

const Hero = () => {
  return (
    <section className="flex flex-col justify-center items-center py-20 gap-6">
      <span className="bg-[#DCFCE7] rounded-lg font-semibold text-sm text-[#496E34] py-1 px-2">
        Excellent in Education Since 2012
      </span>
      <h1 className="text-center text-4xl md:text-6xl font-bold text-gray-900">
        Unlock Your
        <span className="text-sky-600 ml-3">Academic Potential</span>
      </h1>
      <p className="text-center text-md sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
        Join hundreds of successful students who have achieved their academic
        goals with our personalized teaching approach and expert guidance.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-5 w-full">
        <Button variant="contained" className="mx-2">
          Enroll Today <ArrowRight className="text-sky-100 size-5 ms-2" />
        </Button>
        <Button variant="outlined" className="mx-2">
          Learn More
        </Button>
      </div>
    </section>
  );
};

export default Hero;
