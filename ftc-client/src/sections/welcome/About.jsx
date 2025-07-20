import { BookOpen, CheckCircle, Target } from "lucide-react";
import AboutCard from "../../components/cards/AboutCard";

const About = () => {
  const features = [
    {
      icon: <Target className="text-sky-600 size-15" />,
      title: "Personalized Learning",
      description: "Customized teaching methods to match every student's learning style and pace.",
    },
    {
      icon: <BookOpen className="text-green-600 size-15" />,
      title: "Expert Teachers",
      description: "Qualified and experienced educators dedicated to student success.",
    },
    {
      icon: <CheckCircle className="text-sky-600 size-15" />,
      title: "Proven Results",
      description: "Track record of helping students achieve their academic goals.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Finna Tuition Centre?
          </h2>
          <p className="text-md sm:text-xl text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive educational support tailored to each
            student's needs
          </p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <AboutCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
