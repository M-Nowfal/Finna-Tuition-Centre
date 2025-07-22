import { Calendar } from "lucide-react";

const Attendance = () => {
  return (
    <div className="flex flex-col gap-3 p-5">
      <div className="flex gap-2 items-center">
        <Calendar className="text-emerald-600" />
        <span className="text-2xl font-semibold">Attendance</span>
      </div>
      <div className="flex justify-center items-center h-[70vh]">
        <div className="flex flex-col gap-3 items-center">
          <p className="text-lg text-gray-700">Currently not available</p>
        </div>
      </div>
    </div>
  );
}

export default Attendance;