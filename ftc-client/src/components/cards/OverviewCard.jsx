const OverviewCard = ({ title, icon, num, msg, i }) => {

  const numColors = ["text-sky-600", "text-emerald-600", "text-red-600", "text-purple-700"];

  return (
    <div className="flex flex-col bg-white gap-3 p-5 mx-3 md:mx-2 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-200">
      <div className="flex justify-between">
        <p className="font-bold">{title}</p>
        {icon}
      </div>
      <div className="flex flex-col">
        <span className={`text-2xl font-bold ${numColors[i]}`}>{num}</span>
        <p className="text-sm text-gray-500">{msg}</p>
      </div>
    </div>
  );
}

export default OverviewCard;