import { AlertCircle, UserPlus, X } from "lucide-react";
import { useState } from "react";
import Button from "../../components/ui/Button";
import axios from "axios";
import { BouncingDots } from "../../components/ui/Loader";
import { isValidFeeRupee, isValidName, isValidPh, isValidRollNo } from "../../helpers/formValidation";
import { toast } from "sonner";
import { getMonth } from "../../helpers/dateFormat";

const AddStudentForm = ({ setShowStudentAddForm, setStudents, std }) => {
  const date = new Date();
  const currentDate = date.getDate().toString().padStart(2, "0") + "-" + (date.getMonth() + 1).toString().padStart(2, "0") + "-" + date.getFullYear();
  const [studentDetails, setStudentDetails] = useState({
    name: "",
    school: "",
    std,
    section: "A",
    join_date: new Date().toISOString().split("T")[0],
    parent: "",
    phone: "",
    feeRupee: "",
    feeMonth: "",
    feeStatus: false,
    feePaidDate: currentDate,
    isActive: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      validation();
      setLoading(true);
      let details = { ...studentDetails };
      if (studentDetails.feeStatus) {
        const feeMonth = new Date().getMonth() + 1;
        details.feeMonth = feeMonth;
      }
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/staff/student`, details);
      const { roll_no, student_id } = res.data;
      setStudents(prev => (
        [...prev, { ...studentDetails, _id: student_id, roll_no, feeMonth: details.feeMonth || "" }]
      ));
      setShowStudentAddForm(false);
      toast.success(res.data.message);
    } catch (err) {
      const error = err.response?.data?.error || err.message;
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    if (loading) return;
    setError("");
    const { name, value } = e.target;
    if (name !== "feeStatus") {
      setStudentDetails((prev) => ({ ...prev, [name]: value }));
    } else {
      setStudentDetails((prev) => ({ ...prev, [name]: e.target.checked }));
    }
  };

  const validation = () => {
    isValidName(studentDetails.name);
    isValidPh(studentDetails.phone);
    studentDetails.roll_no && isValidRollNo(studentDetails.roll_no);
    isValidName(studentDetails.parent);
    studentDetails.feeRupee && isValidFeeRupee(studentDetails.feeRupee);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex flex-col items-center justify-center p-4 z-50">
      <div className="w-full max-w-2xl">
        <div
          className="w-fit ms-auto cursor-pointer bg-sky-50 hover:bg-red-300 p-1 rounded-lg transition-all duration-200 mb-2"
          role="button"
          onClick={() => !loading && setShowStudentAddForm(false)}
        >
          <X className="text-black size-5" />
        </div>
      </div>
      <div className="w-full max-w-2xl overflow-y-auto scrollbar-hide max-h-[90vh] bg-white p-5 rounded-xl border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <UserPlus className="text-sky-600 size-6" />
              <span className="text-xl font-semibold">Add New Student</span>
            </div>
            <p className="text-gray-500">
              Enter the student's information to create a new profile
            </p>
          </div>
        </div>
        <form className="mt-5" onSubmit={handleSubmit}>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-3">
              <label htmlFor="name" className="font-semibold text-sm ms-2">
                Full Name *
              </label>
              <input
                autoFocus
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                value={studentDetails.name}
                onChange={handleInputChange}
                className="rounded-lg outline-1 p-2 outline-gray-200"
                placeholder="Enter Student's full name"
                required
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="school" className="font-semibold text-sm ms-2">
                School Name *
              </label>
              <input
                autoFocus
                type="text"
                name="school"
                id="school"
                value={studentDetails.school}
                onChange={handleInputChange}
                className="rounded-lg outline-1 p-2 outline-gray-200"
                placeholder="Enter Student's school name"
                required
              />
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="roll_no"
                className="font-semibold text-sm ms-2 text-gray-400"
              >
                Roll:No *
              </label>
              <input
                type="text"
                name="roll_no"
                id="roll_no"
                placeholder="Roll:No will be given automatically"
                className="rounded-lg outline-1 p-2 outline-gray-200"
                required
                readOnly
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="std" className="font-semibold text-sm ms-2">
                Class *
              </label>
              <input
                autoFocus
                type="text"
                name="std"
                id="std"
                autoComplete="std"
                value={studentDetails.std + "th"}
                onChange={handleInputChange}
                className="rounded-lg outline-1 p-2 outline-gray-200"
                placeholder="Enter Class"
                required
                readOnly
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="std" className="font-semibold text-sm ms-2">
                Section *
              </label>
              <select
                name="section"
                id="section"
                className="rounded-lg outline-1 p-2 outline-gray-200"
                value={studentDetails.section}
                onChange={handleInputChange}
                required
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="join_date" className="font-semibold text-sm ms-2">
                Joining Date *
              </label>
              <input
                type="date"
                name="join_date"
                id="join_date"
                value={studentDetails.join_date}
                onChange={handleInputChange}
                className="rounded-lg outline-1 p-2 outline-gray-200"
                required
              />
            </div>
          </div>
          <div className="mt-7">
            <span className="font-semibold text-gray-900 text-xl">
              Parent Information
            </span>
          </div>
          <hr className="mb-5 mt-2 text-gray-300" />
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-3">
              <label htmlFor="parent" className="font-semibold text-sm ms-2">
                Parent/Guardian Name *
              </label>
              <input
                type="text"
                name="parent"
                id="parent"
                value={studentDetails.parent}
                onChange={handleInputChange}
                className="rounded-lg outline-1 p-2 outline-gray-200"
                placeholder="Enter Student's full name"
                required
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="phone" className="font-semibold text-sm ms-2">
                Contact Number *
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                autoComplete="mobile email"
                value={studentDetails.phone}
                onChange={handleInputChange}
                className="rounded-lg outline-1 p-2 outline-gray-200"
                placeholder="Enter Phone"
                required
              />
            </div>
          </div>
          <div className="mt-7">
            <span className="font-semibold text-gray-900 text-xl">
              Fee Information
            </span>
          </div>
          <hr className="mb-5 mt-2 text-gray-300" />
          <div className="flex flex-col gap-3">
            <label htmlFor="parent" className="font-semibold text-sm ms-2">
              ₹Fee Rupees
            </label>
            <input
              type="text"
              name="feeRupee"
              id="feeRupee"
              value={studentDetails.feeRupee}
              onChange={handleInputChange}
              className="rounded-lg outline-1 p-2 outline-gray-200"
              placeholder="Enter fees amount"
              required={studentDetails.feeStatus}
            />
          </div>
          <div className="flex gap-3 items-center mt-5">
            <input
              type="checkbox"
              name="feeStatus"
              id="feeStatus"
              checked={studentDetails.feeStatus}
              onChange={handleInputChange}
              className="size-4 accent-green-600 cursor-pointer"
              required={studentDetails.feeRupee}
            />
            <label htmlFor="feeStatus" className="font-semibold">
              Fees paid for current month {getMonth(new Date().getMonth() + 1)}
            </label>
          </div>
          {studentDetails.feeStatus && <div className="flex flex-col gap-3 mt-5">
            <label htmlFor="feePaidDate" className="font-semibold">
              Fee Date
            </label>
            <input
              type="text"
              name="feePaidDate"
              id="feePaidDate"
              value={studentDetails.feePaidDate}
              onChange={handleInputChange}
              className="rounded-lg outline-1 p-2 outline-gray-200"
              placeholder="Enter Paying date"
            />
          </div>}
          {error && (
            <div className="border border-red-400 p-4 rounded-xl flex gap-3 my-5">
              <AlertCircle className="size-4 text-red-500 mt-0.5" />
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}
          <hr className="mb-5 mt-4 text-gray-300" />
          <div className="flex flex-col sm:flex-row-reverse justify-end gap-3">
            <Button
              variant="contained"
              type="submit"
              size="sm"
              className="flex-1"
              disabled={loading}
            >
              {loading ? "Submitting" : "Submit"}&nbsp;&nbsp;
              {loading && <BouncingDots />}
            </Button>
            <Button
              variant="danger-outlined"
              size="sm"
              className="flex-1"
              onClick={() => setShowStudentAddForm(false)}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentForm;
