import {
  Calendar,
  CheckCircle,
  Clock,
  Edit,
  GraduationCap,
  Phone,
  User,
} from "lucide-react";
import Button from "../ui/Button";

const StudentCard = () => {
  return (
    <div className="flex gap-2 py-5 px-5 flex-col border-l-4 border-l-sky-500 border border-gray-300 rounded-xl bg-white shadow hover:shadow-xl transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-gray-100 rounded-full p-2.5 font-semibold text-lg text-sky-800">ET</div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold">Emma Thompson</span>
            <div className="text-gray-700 flex items-center gap-1">
              <GraduationCap className="size-4"/> 9th Std • Age 14
            </div>
          </div>
        </div>
        <Edit className="text-gray-400 size-4" />
      </div>
      <div className="flex items-center gap-2">
        <User className="text-gray-400 size-4" />
        <p className="text-gray-700 text-sm">Sara Thompson</p>
      </div>
      <div className="flex items-center gap-2">
        <Phone className="text-gray-400 size-4" />
        <p className="text-gray-700 text-sm">+91 82978-59865</p>
      </div>
      <div className="flex items-center gap-2">
        <Calendar className="text-gray-400 size-4" />
        <p className="text-gray-700 text-sm">Joined 15/06/2025</p>
      </div>
      <div className="flex gap-2">
        <div className="flex bg-green-200 rounded-full items-center gap-1 px-2 text-sm">
          <CheckCircle className="text-green-900 size-3" />
          <p className="text-green-900 font-semibold text-[12px]">Fees Paid</p>
        </div>
        <div className="flex bg-gray-200 rounded-full items-center gap-1 px-3 py-0.5 text-sm">
          <Clock className="text-gray-700 size-3" />
          <p className="text-gray-700 font-semibold text-[12px]">Absent</p>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
          <Button variant="contained" className="flex-1">Mark Present</Button>
          <Button variant="outlined" className="flex-1">Mark Paid</Button>
      </div>
    </div>
  );
};

export default StudentCard;
