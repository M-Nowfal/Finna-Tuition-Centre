import { AlertCircle, UserPlus, X } from "lucide-react";
import { useState } from "react";
import Button from "../../components/ui/Button";
import axios from "axios";
import { BouncingDots } from "../../components/ui/Loader";
import { getMonth } from "../../helpers/dateFormat";
import { isValidFeeRupee, isValidName, isValidPh, isValidRollNo } from "../../helpers/formValidation";
import { toast } from "sonner";

const AddStudentForm = ({ setShowStudentAddForm, setStudents, std }) => {
  const [studentDetails, setStudentDetails] = useState({
    name: "",
    std,
    section: "A",
    join_date: "",
    parent: "",
    phone: "",
    feeRupee: "",
    feeStatus: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      validation();
      setLoading(true);
      if (studentDetails.feeStatus) {
        setStudentDetails(prev => (
          { ...prev, feeMonth: getMonth() }
        ));
      }
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/staff/student`, studentDetails);
      const roll_no = res.data.roll_no;
      setStudents(prev => (
        [...prev, { ...studentDetails, roll_no }]
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-2xl overflow-y-auto max-h-[90vh] bg-white p-5 rounded-xl border border-gray-200">
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
          <div className="hover:bg-sky-100 cursor-pointer p-1 rounded-md">
            <X
              className="text-gray-600 size-5"
              onClick={() => !loading && setShowStudentAddForm(false)}
            />
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
              Fees paid for current month
            </label>
          </div>
          {error && (
            <div className="border border-red-400 p-4 rounded-xl flex gap-3 my-5">
              <AlertCircle className="size-4 text-red-500 mt-0.5" />
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}
          <hr className="mb-5 mt-4 text-gray-300" />
          <div className="flex justify-end gap-7">
            <Button
              variant="danger-outlined"
              size="sm"
              onClick={() => setShowStudentAddForm(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit" size="sm" className="flex gap-2" disabled={loading}>
              {loading ? "Submitting" : "Submit"}
              {loading && <BouncingDots />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentForm;
