import { Calendar, GraduationCap, Phone, School } from "lucide-react";
import { firstTwoLettersOfName } from "../../helpers/stringFormat";
import Button from "../ui/Button";

const AttendanceCard = ({
  _id, name, std, section, roll_no,
  phone, join_date, isActive, school,
  markPresent, attendance
}) => {
  return (
    <div
      className={`
        flex gap-2 py-5 px-5 flex-col border-l-4 border ${isActive ? "border-l-sky-500" : "border-l-red-500"} 
        border-gray-300 rounded-xl bg-white shadow hover:shadow-xl transition-all duration-200 ${!isActive && "opacity-50"}
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-gray-100 rounded-full p-2.5 font-semibold text-lg text-sky-800">
            {firstTwoLettersOfName(name)}
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
      </div>
      <div className="flex items-center gap-2">
        <School className="text-gray-400 size-4" />
        <p className="text-gray-700 text-sm">{school || "Not Updated"}</p>
      </div>
      <div className="flex items-center gap-2">
        <Phone className="text-gray-400 size-4" />
        <p className="text-gray-700 text-sm">+91 {phone}</p>
      </div>
      <div className="flex items-center gap-2">
        <Calendar className="text-gray-400 size-4" />
        <p className="text-gray-700 text-sm">Joined {join_date.split("T")[0]}</p>
      </div>

      <div className="flex gap-2 mt-3">
        {<Button
          variant={attendance[_id] ? "contained" : "outlined"}
          size="sm"
          className="flex-1 disabled:cursor-not-allowed"
          onClick={() => markPresent(_id)}
          disabled={!isActive}
        >
          {attendance[_id] ? "Present" : "Mark Present"}
        </Button>}
      </div>
    </div>
  );
}

export default AttendanceCard;