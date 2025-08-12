import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "sonner";
import Button from "../../components/ui/Button";
import { BouncingDots } from "../../components/ui/Loader";
import { AlertCircle, Edit, X } from "lucide-react";
import { FTCAppContext } from "../../contexts/AppContextProvider";

const EditStaff = ({ old_details, setShowEditStaffForm }) => {

  const { setFtcAuthRole } = useContext(FTCAppContext);
  const [details, setDetails] = useState({
    name: old_details.name,
    phone: old_details.phone,
    email: old_details.email
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/staff/update-stf`, { details, id: old_details._id });
      localStorage.setItem("ftcAuthRole", JSON.stringify(res.data.updatedDetails));
      setFtcAuthRole(res.data.updatedDetails);
      toast.success(res.data.message);
      setShowEditStaffForm(false);
    } catch (err) {
      const error = err.response?.data?.error || err.message;
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails(prev => (
      { ...prev, [name]: value }
    ));
  };

  return (
    <div className="fixed flex flex-col z-10 p-4 justify-center items-center inset-0 bg-black/30">
      <div className="w-full max-w-2xl">
        <div
          className="w-fit ms-auto cursor-pointer bg-sky-50 p-1 rounded-lg transition-all duration-200 mb-2"
          role="button"
          onClick={() => setShowEditStaffForm(false)}
        >
          <X className="text-black size-5" />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col bg-white p-5 border border-gray-400 shadow rounded-2xl gap-3 w-full md:w-2xl">
        <div className="flex gap-2 items-center">
          <Edit className="text-sky-600" />
          <span className="text-xl font-semibold">Edit Staff Details of '{old_details.staff_id}'</span>
        </div>
        <hr className="text-gray-300 my-2" />
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-semibold text-sm label-element ps-2">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={details.name}
            onChange={handleInputChange}
            autoComplete="name"
            className="outline outline-gray-300 focus:outline-sky-500 p-2 rounded-lg inp-element"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="font-semibold text-sm label-element ps-2">Phone No</label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={details.phone}
            onChange={handleInputChange}
            autoComplete="mobile email"
            className="outline outline-gray-300 focus:outline-sky-500 p-2 rounded-lg inp-element"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-semibold text-sm label-element ps-2">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={details.email}
            onChange={handleInputChange}
            autoComplete="email"
            className="outline outline-gray-300 focus:outline-sky-500 p-2 rounded-lg inp-element"
          />
        </div>
        {error && (
          <div className="border border-red-400 p-4 rounded-xl flex gap-3 mt-3">
            <AlertCircle className="size-4 text-red-500 mt-0.5" />
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}
        <hr className="text-gray-300 my-5" />
        <div className="flex flex-col sm:flex-row-reverse gap-3">
          <Button
            variant="contained"
            size="sm"
            type="submit"
            className="flex-1"
            disabled={loading}
          >
            {loading ? "Submitting" : "Submit"}&nbsp;&nbsp;
            {loading && <BouncingDots />}
          </Button>
          <Button
            variant="danger-outlined"
            size="sm"
            onClick={() => setShowEditStaffForm(false)}
            className="flex-1"
            disabled={loading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditStaff;