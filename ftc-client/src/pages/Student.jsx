import { ArrowLeft, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { getMonth } from "../helpers/dateFormat";

const Student = () => {
  const { student } = useLocation().state || { student: {} };

  const student_details = [
    { label: "School", value: student?.school },
    { label: "Join Date", value: student?.join_date.split("T")[0] },
    { label: "Class", value: student?.std },
    { label: "Section", value: student?.section },
    { label: "Phone", value: student?.phone },
    { label: "Parent", value: student?.parent },
    { label: "Last Fee Month", value: student?.feeMonth },
    { label: "Fee Amount", value: `₹${student?.feeRupee}` },
    { label: "Fee Paid Date", value: student?.feePaidDate }
  ];

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center p-4 bg-gray-50 mb-10">
      <Link
        to="/"
        className="flex items-center me-auto gap-2 text-sky-500 hover:text-sky-600 transition-colors mb-6 lg:mb-8"
      >
        <ArrowLeft className="size-5" />
        <span className="font-medium">Back to Dashboard</span>
      </Link>
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-sky-500 to-blue-600 p-6 flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-full">
              <User className="size-8 text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-white">{student?.name}</h1>
              <h1 className="text-2xl font-bold text-white">{student?.roll_no}</h1>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {student_details.map((detail, i) => (
                <div key={detail.label} className="space-y-1">
                  <label className="block text-sm font-medium text-gray-500 uppercase tracking-wider">
                    {detail.label}
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-lg font-semibold text-gray-800">
                      {i === 5 ? getMonth(detail.value) : detail.value || "N/A"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Last updated: {student?.updatedAt.split("T")[0]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Student;