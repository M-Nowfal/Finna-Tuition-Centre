import {
  BookOpen,
  IndianRupee,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import OverviewCard from "../../components/cards/OverviewCard";
import RecentStudentCard from "../../components/cards/RecentStudentCard";

const Overview = () => {
  const overviews = [
    {
      title: "Total Student",
      icon: <Users className="text-sky-500" />,
      num: 3,
      msg: "Active enrollments",
    },
    {
      title: "Present Today",
      icon: <UserCheck className="text-emerald-500" />,
      num: 0,
      msg: "Attendance today",
    },
    {
      title: "Fees Pending",
      icon: <IndianRupee className="text-red-500" />,
      num: 0,
      msg: "Payment pending",
    },
    {
      title: "New This Month",
      icon: <TrendingUp className="text-purple-600" />,
      num: 1,
      msg: "New enrollments",
    },
  ];

  const recentStuds = [
    { name: "Mohammed Fariz", std: 9, feeStatus: true, join_date: "03/06/2025"},
    { name: "Abdullah", std: 10, feeStatus: false, join_date: "01/06/2025"},
    { name: "Shahadoon", std: 9, feeStatus: true, join_date: "12/06/2025"},
    { name: "Mohammed Irfan", std: 9, feeStatus: true, join_date: "03/06/2025"},
    { name: "Asanar Apsal", std: 9, feeStatus: true, join_date: "14/06/2025"},
    { name: "Aalir Rizal", std: 9, feeStatus: false, join_date: "09/06/2025"},
  ];

  return (
    <div className="flex flex-col gap-5 md:p-2">
      <div className="flex flex-col p-3 pb-0">
        <span className="text-xl md:text-3xl font-bold">Dashboard Overview</span>
        <p className="text-gray-500">
          Welcome back! Here's what's happening at FTC today.
        </p>
      </div>
      <div className="grid w-full sm:grid-cols-2 lg:grid-cols-4 gap-2 md:mt-5">
        {overviews.map((overview, index) => (
          <OverviewCard
            key={index}
            title={overview.title}
            icon={overview.icon}
            num={overview.num}
            msg={overview.msg}
            i={index}
          />
        ))}
      </div>
      <div className="bg-white rounded-xl border border-gray-200 shadow flex flex-col p-7 pb-3 mx-2">
        <div className="flex flex-col pb-2">
          <div className="flex items-center gap-2">
            <BookOpen className="text-sky-600 size-6" />
            <span className="text-xl font-semibold">Recent Students</span>
          </div>
          <p className="text-sm text-gray-500">
            Latest student enrollments and updates
          </p>
        </div>
        {recentStuds.map(({ name, std, feeStatus, join_date }, index) => (
          <RecentStudentCard 
            key={index}
            name={name}
            std={std}
            feeStatus={feeStatus}
            join_date={join_date}
          />
        ))}
      </div>
    </div>
  );
};

export default Overview;
