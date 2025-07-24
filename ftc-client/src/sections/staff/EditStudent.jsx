import { AlertCircle, UserPlus, X } from "lucide-react";
import Button from "../../components/ui/Button";
import { useState } from "react";
import axios from "axios";
import { isValidName, isValidPh, isValidRollNo } from "../../helpers/formValidation";
import Alert from "../../components/ui/Alert";

const EditStudent = ({ editingStudentDetails, setShowEditStudentForm, setStudents }) => {
  const { _id, name, std, section, roll_no, parent, phone, join_date, feeRupee, feeMonth, isActive } = editingStudentDetails;
  const [studentDetails, setStudentDetails] = useState({
    _id, name, roll_no, std, section, join_date,
    parent, phone, feeRupee, feeMonth, isActive
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      validation();
      setLoading(true);
      await axios.put(`${import.meta.env.VITE_API_URL}/staff/update`, studentDetails);
      setStudents(prev => prev.filter(student => (
        student._id !== studentDetails._id
      )));
      if (std === studentDetails.std) {
        setStudents(prev => (
          [...prev, studentDetails]
        ));
      }
      setShowEditStudentForm(false);
    } catch (err) {
      const error = err.response?.data?.error || err.message;
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    if (loading) return;
    const { name, value } = e.target;
    if (name !== "isActive") {
      setStudentDetails((prev) => ({ ...prev, [name]: value }));
    } else {
      setStudentDetails((prev) => ({ ...prev, [name]: !prev.isActive }));
    }
  };

  const handleRemoveStudent = async () => {
    try {
      setLoading(true);
      await axios.delete(`${import.meta.env.VITE_API_URL}/staff/student`, {
        data: { id: studentDetails._id },
        headers: { "Content-Type": "application/json" }
      });
      setStudents(prev => prev.filter(student => (
        student._id !== studentDetails._id
      )));
      setShowEditStudentForm(false);
    } catch (err) {
      const error = err.response?.data?.error || err.message;
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const validation = () => {
    isValidName(studentDetails.name);
    isValidPh(studentDetails.phone);
    studentDetails.roll_no && isValidRollNo(studentDetails.roll_no);
    isValidName(studentDetails.parent);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-2xl overflow-y-auto max-h-[90vh] bg-white p-5 rounded-xl border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <UserPlus className="text-sky-600 size-6" />
              <span className="text-xl font-bold">Edit Student</span>
            </div>
          </div>
          <div className="hover:bg-sky-100 cursor-pointer p-1 rounded-md">
            <X
              className="text-gray-600 size-5"
              onClick={() => setShowEditStudentForm(false)}
            />
          </div>
        </div>
        <form className="mt-5" onSubmit={handleSubmit}>
          <div className="mt-7">
            <span className="font-semibold text-gray-900 text-xl">
              Student Information
            </span>
          </div>
          <hr className="mb-5 mt-2 text-gray-300" />
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
              <label htmlFor="roll_no" className={`font-semibold ${!feeMonth && "text-gray-400"} text-sm ms-2`}>
                Roll:No *
              </label>
              <input
                type="text"
                name="roll_no"
                id="roll_no"
                value={studentDetails.roll_no}
                onChange={handleInputChange}
                className={`rounded-lg outline-1 p-2 ${!feeMonth ? "opacity-30" : "opacity-100"} outline-gray-200`}
                placeholder="Enter Student's Roll:No"
                disabled={!studentDetails.feeMonth}
                required
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="std" className="font-semibold text-sm ms-2">
                Class *
              </label>
              <select
                name="std"
                id="std"
                className="rounded-lg outline-1 p-2 outline-gray-200"
                value={studentDetails.std}
                onChange={handleInputChange}
                required
              >
                <option value="9">9th std</option>
                <option value="10">10th std</option>
                <option value="11">11th std</option>
                <option value="12">12th std</option>
              </select>
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
                value={studentDetails.join_date.split("T")[0]}
                onChange={handleInputChange}
                className="rounded-lg outline-1 p-2 outline-gray-200"
                required
              />
            </div>
            <div className="flex items-center gap-3 mt-8">
              <label htmlFor="isActive" className="font-semibold">
                Discontinued
              </label>
              <input
                type="checkbox"
                name="isActive"
                id="isActive"
                checked={!studentDetails.isActive}
                onChange={handleInputChange}
                className="size-4 accent-green-600 cursor-pointer"
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
              onClick={() => setShowAlert(true)}
              disabled={loading}
            >
              Remove Student
            </Button>
            <Button
              variant="contained"
              type="submit"
              size="sm"
              disabled={loading}
            >
              Update Info
            </Button>
          </div>
        </form>
      </div>
      {showAlert && <Alert
        title="Remove Student"
        msg="Are you sure to remove the student permanently, if you remove the student then all data related to that student will be deleted."
        btn="Remove"
        proceed={handleRemoveStudent}
        setShowAlert={setShowAlert}
      />}
    </div>
  );
};

export default EditStudent;
