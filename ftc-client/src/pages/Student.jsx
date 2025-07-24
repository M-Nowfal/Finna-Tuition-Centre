import { ArrowLeft, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { getMonth } from "../helpers/dateFormat";

const Student = () => {

  const { student } = useLocation().state || { student: {} };

  const student_details = [
    { label: "Name", value: student.name },
    { label: "Roll:No", value: student.roll_no },
    { label: "Class", value: student.std },
    { label: "Section", value: student.section },
    { label: "Phone", value: student.phone },
    { label: "Parent", value: student.parent },
    { label: "Last Fee", value: student.feeMonth },
    { label: "Fee Amount", value: student.feeRupee }
  ];

  return (
    <div className="flex flex-col items-center justify-center h-[90vh]">
      <Link to="/" className="me-auto flex items-center gap-3 pb-5">
        <ArrowLeft className="text-sky-400 ms-5 size-5" />
        <span className="text-sky-400">Back</span>
      </Link>
      <div className="bg-white shadow-md border border-gray-300 rounded-2xl p-5">
        <div className="flex gap-2 items-center">
          <User className="size-8 text-sky-600" />
          <span className="text-2xl font-semibold">Student Details</span>
        </div>
        <hr className="text-gray-400 my-4" />
        <div className="flex flex-col gap-5">
          {student_details.map((detail, i) => (
            <div key={detail.label} className="flex gap-5 items-center justify-between">
              <label htmlFor="name" className="text-lg font-semibold">{detail.label}</label>
              <input
                type="text" name="name" id="name" readOnly value={i === 6 ? getMonth(detail.value) : detail.value}
                className="border border-gray-300 p-2 rounded-md font-semibold text-lg outline-0"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Student;