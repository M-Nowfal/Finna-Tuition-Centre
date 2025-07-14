import { Award, GraduationCap, Trophy, Users } from "lucide-react";
import AchievementCard from "../../components/cards/AchievementCard";

const Achievements = () => {
  const acheivements = [
    {
      icon: <Users className="text-black size-15" />,
      title: "500+ Students",
      description: "Successfully guided through their academic journey",
    },
    {
      icon: <Award className="text-black size-15" />,
      title: "595% Success Rate",
      description: "Students achieving their target grades",
    },
    {
      icon: <GraduationCap className="text-black size-15" />,
      title: "13+ Years",
      description: "Of excellence in education",
    },
    {
      icon: <Trophy className="text-black size-15" />,
      title: "Top Performers",
      description: "Consistently ranking among the best",
    },
  ];

  return (
    <section
      id="achievements"
      className="py-20 bg-gradient-to-r from-sky-600 to-green-600 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Achievements
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Numbers that speak for our commitment to educational excellence
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {acheivements.map((achievement, index) => (
            <AchievementCard
              key={index}
              icon={achievement.icon}
              title={achievement.title}
              description={achievement.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
