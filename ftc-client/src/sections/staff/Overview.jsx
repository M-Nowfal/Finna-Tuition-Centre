import {
  BookOpen,
  Loader2,
  TrendingUp,
  Users,
} from "lucide-react";
import OverviewCard from "../../components/cards/OverviewCard";
import RecentStudentCard from "../../components/cards/RecentStudentCard";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";

const Overview = () => {

  const [overviewValues, setOverviewValues] = useState({ total_student: 0, new_this_month: 0 });

  const overviews = [
    {
      title: "Total Student",
      icon: <Users className="text-sky-500" />,
      num: overviewValues.total_student,
      msg: "Active enrollments",
    },
    {
      title: "New This Month",
      icon: <TrendingUp className="text-purple-600" />,
      num: overviewValues.new_this_month,
      msg: "New enrollments",
    },
  ];

  const [recentStudents, setRecentStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const getOverview = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/staff/gettotalstudents`);
      const { students } = res.data || { students: [] };
      const total_student = students.length;
      const new_this_month = (students.filter(student => student.join_date.split("T")[0].slice(5, 7))).length;
      setOverviewValues({
        total_student, new_this_month
      });
    } catch (err) {
      const error = err.response?.data?.error || err.message;
      toast.error(error);
    }
  };

  const getRecentStudents = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/staff/recentstuds`);
      setRecentStudents(res.data.recentStudents || []);
    } catch (err) {
      const error = err.response?.data?.error || err.message;
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOverview();
    getRecentStudents();
  }, []);

  return (
    <div className="flex flex-col gap-5 md:p-2">
      <div className="flex flex-col p-3 pb-0">
        <span className="text-xl md:text-3xl font-bold">Dashboard Overview</span>
        <p className="text-gray-500">
          Welcome back! Here's what's happening at FTC today.
        </p>
      </div>
      <div className="grid w-full sm:grid-cols-2">
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
        {recentStudents.map(({ name, std, feeStatus, join_date }, index) => (
          <RecentStudentCard
            key={index}
            name={name}
            std={std}
            feeStatus={feeStatus}
            join_date={join_date.split("T")[0]}
          />
        ))}
        {loading && (
          <div className="flex justify-center items-center h-[10vh]">
            <Loader2 className="size-14 text-sky-700 animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Overview;
