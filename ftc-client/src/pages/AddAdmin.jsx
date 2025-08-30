import { useContext } from "react";
import { useState } from "react";
import { FTCAppContext } from "../contexts/AppContextProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AlertCircle, ArrowLeft, GraduationCap } from "lucide-react";
import Button from "../components/ui/Button";
import axios from "axios";

const AddAdmin = () => {

  const [staffId, setStaffId] = useState("");
  const { ftcAuthRole } = useContext(FTCAppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (ftcAuthRole.staff_id !== import.meta.env.VITE_ADMIN_ID) {
      toast.error("Unauthorized admin");
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/add-admin`, {staffId});
      toast.success(res.data.message);
      window.history.back();
    } catch (err) {
      const error = err.response?.data?.error || err.message;
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-5 mb-5">
          <Button
            onClick={() => window.history.back()}
            className="absolute top-10 sm:left-10">
            <div className="flex gap-2 items-center text-sky-500">
              <ArrowLeft className="size-5" />
              <span className="font-semibold">Back</span>
            </div>
          </Button>
          <div className="flex justify-center items-center gap-2 text-3xl font-bold">
            <GraduationCap className="text-sky-600 size-10" />
            <h1>FTC</h1>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">Add new Admin</span>
            <p className="text-gray-600">Only super admin can add admins</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-5">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <label
                htmlFor="staff_id"
                className="font-semibold ms-2 text-sm label-element"
              >
                Enter Staff-ID
              </label>
              <input
                type="text"
                name="staff_id"
                value={staffId}
                onChange={(e) => setStaffId(e.target.value)}
                id="staff_id"
                className="outline outline-gray-300 focus:outline-sky-500 p-2 rounded-lg inp-element"
                placeholder={`Enter Staff-ID`}
                required
              />
              {error && (
                <div className="border border-red-400 p-4 rounded-xl flex gap-3 mt-2">
                  <AlertCircle className="size-4 text-red-500 mt-0.5" />
                  <p className="text-red-500 text-sm">{error}</p>
                </div>
              )}
              <hr className="text-gray-300 my-4" />
              <Button
                type="button"
                variant="outlined"
                size="sm"
                onClick={() => window.history.back()}
                disabled={loading}
              >Cancel</Button>
              <Button
                type="submit"
                variant="success"
                size="sm"
                disabled={loading}
              >Submit</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAdmin;
