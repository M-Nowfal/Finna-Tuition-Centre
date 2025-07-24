import {
  Calendar,
  CheckCircle,
  Clock,
  Edit,
  GraduationCap,
  IndianRupee,
  Phone,
  User,
} from "lucide-react";
import Button from "../ui/Button";
import { useState } from "react";
import { getMonth } from "../../helpers/dateFormat";

const StudentCard = ({
  _id, name, std, section, roll_no, parent, phone, join_date, feeRupee, feeMonth, attendance,
  shortName, loading, markAttendance, setShowEditStudentForm, setEditingStudentDetails, 
  setConfirmFeesPaid, setLastFeeDetails, isActive
}) => {
  const paid = feeMonth;  
  const currentMonth = (feeMonth == new Date().getMonth() + 1);

  const [present, setPresent] = useState(attendance);

  return (
    <div
      className={`flex gap-2 py-5 px-5 flex-col border-l-4 border-l-sky-500 border 
      border-gray-300 rounded-xl bg-white shadow hover:shadow-xl transition-all duration-200 ${!isActive && "opacity-50"}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-gray-100 rounded-full p-2.5 font-semibold text-lg text-sky-800">
            {shortName}
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold">{name}</span>
            <div className="text-gray-700 flex items-center gap-1">
              <GraduationCap className="size-4" />
              <span className="text-sm">
                {std}
                <sup>th</sup> Std {section} |
              </span>
              <span className="font-bold text-gray-950">{roll_no}</span>
            </div>
          </div>
        </div>
        <div className="rounded-md p-2 hover:bg-sky-100 transition-all duration-200 cursor-pointer">
          <Edit className="text-gray-400 size-4" onClick={() => {
            setEditingStudentDetails({ _id, name, std, section, roll_no, parent, phone, join_date, feeRupee, feeMonth, isActive });
            setShowEditStudentForm(prev => !prev);
          }} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <User className="text-gray-400 size-4" />
        <p className="text-gray-700 text-sm">{parent}</p>
      </div>
      <div className="flex items-center gap-2">
        <Phone className="text-gray-400 size-4" />
        <p className="text-gray-700 text-sm">+91 {phone}</p>
      </div>
      <div className="flex items-center gap-2">
        <Calendar className="text-gray-400 size-4" />
        <p className="text-gray-700 text-sm">Joined {join_date}</p>
      </div>
      <div className="flex items-center gap-2">
        <IndianRupee className="text-gray-400 size-4" />
        <p className="text-gray-700 text-sm">{paid ? `Last Fee ₹${feeRupee} paid for ${getMonth(feeMonth)}` : `Pending`}</p>
      </div>
      <div className="flex gap-2 my-2">
        <div
          className={`flex ${(paid && currentMonth) ? "bg-green-200" : "bg-red-100"
            } rounded-full items-center gap-1 px-2 text-sm`}
        >
          <CheckCircle
            className={`${(paid && currentMonth) ? "text-green-900" : "text-red-900"
              } size-3`}
          />
          <p
            className={`${(paid && currentMonth) ? "text-green-900" : "text-red-900"
              } font-semibold text-[12px]`}
          >
            {(paid && currentMonth) ? "Fees Paid" : "Pending"}
          </p>
        </div>
        <div
          className={`flex ${attendance || present ? "bg-sky-200" : "bg-gray-200"
            } rounded-full items-center gap-1 px-3 py-0.5 text-sm`}
        >
          <Clock
            className={`size-3 ${attendance || present ? "text-sky-900" : "text-gray-700"
              }`}
          />
          <p
            className={`${attendance || present ? "text-sky-900" : "text-gray-700"
              } font-semibold text-[12px]`}
          >
            {attendance || present ? "Present Today" : "Not Marked"}
          </p>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <Button
          variant={present ? "secondary" : "contained"}
          size="sm"
          className="flex-1"
          disabled={loading || !isActive}
          onClick={() =>
            markAttendance(_id, (err) => !err && setPresent((prev) => !prev))
          }
        >
          {loading ? "..." : present ? "Mark Absent" : "Mark Present"}
        </Button>
        {!(paid && currentMonth) && <Button
          variant={(paid && currentMonth) ? "secondary" : "contained"}
          size="sm"
          className="flex-1"
          onClick={() => {
            setConfirmFeesPaid(true);
            setLastFeeDetails({ _id, name, std, section, roll_no, feeMonth, join_date });
          }}
          disabled={!isActive}
        >
          {loading ? "Updating..." : "Mark Paid"}
        </Button>}
      </div>
    </div>
  );
};

export default StudentCard;
