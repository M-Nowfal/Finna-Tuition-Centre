
const RecentStudentCard = ({ name, std, join_date, feeMonth }) => {

  const currentMonth = new Date().getMonth() + 1;
  const paid = (feeMonth == currentMonth);

  return (
    <div className="w-full bg-gray-50 border border-gray-100 flex justify-between items-center m-auto p-3 my-2 rounded-xl">
      <div className="flex flex-col gap-1">
        <span className="font-semibold">{name}</span>
        <p className="text-sm text-gray-600">{std}<sup>th</sup> STD • Joined {join_date}</p>
      </div>
      <div className={`px-3 flex rounded-full ${paid ? "bg-green-600/80" : "bg-red-500/80"}`}>
        <span className="text-sm font-semibold text-white">{paid ? "Paid" : "Pending"}</span>
      </div>
    </div>
  );
}

export default RecentStudentCard;