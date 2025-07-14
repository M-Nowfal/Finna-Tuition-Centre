const AchievementCard = ({ icon, title, description }) => {
  return (
    <div className="p-3 border border-sky-100/30 text-black bg-sky-100/10 rounded-2xl shadow hover:shadow-lg hover:bg-sky-200/30 transition-all duration-100">
      <div className="flex flex-col gap-3 items-center justify-center py-3">
        {icon}
        <span className="text-center text-2xl font-semibold">{title}</span>
        <span className="text-md text-center text-black mx-5">
          {description}
        </span>
      </div>
    </div>
  );
};

export default AchievementCard;