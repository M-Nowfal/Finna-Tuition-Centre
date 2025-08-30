import {
  AlertCircle,
  ArrowLeft,
  GraduationCap,
} from "lucide-react";
import Button from "../../components/ui/Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BouncingDots } from "../../components/ui/Loader";

const ForgotPassword = () => {
  const [credentials, setCredentials] = useState({
    phone: "",
    staff_id: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/forgot-password`, { ...credentials });
      navigate("/reset-password", { state: { authorized: true, id: res.data.id }, replace: true });
    } catch (err) {
      const error = err.response?.data?.error || err.message;
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-5 mb-5">
          <Link to="/login?role=staff" className="absolute top-10 sm:left-10">
            <div className="flex gap-2 items-center text-sky-500">
              <ArrowLeft className="size-5" />
              <span className="font-semibold">Back</span>
            </div>
          </Link>
          <div className="flex justify-center items-center gap-2 text-3xl font-bold">
            <GraduationCap className="text-sky-600 size-10" />
            <h1>FTC</h1>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-gray-600">Enter Staff-ID and phone number for verification</p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-5"
        >
          <div className="flex flex-col items-center">
            <span className="text-2xl font-semibold">
              Forgot Password
            </span>
          </div>
          <div className="flex flex-col gap-3 py-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="staff_id"
                className="font-semibold text-sm label-element"
              >
                Staff ID
              </label>
              <input
                type="text"
                name="staff_id"
                value={credentials.staff_id}
                onChange={handleInputChange}
                id="staff_id"
                className="outline outline-gray-300 focus:outline-sky-500 p-2 rounded-lg inp-element"
                placeholder="Enter Phone Number"
                autoComplete="mobile email"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="phone"
                className="font-semibold text-sm label-element"
              >
                Phone Number
              </label>
              <input
                type="mobile"
                name="phone"
                value={credentials.phone}
                onChange={handleInputChange}
                id="phone"
                className="outline outline-gray-300 focus:outline-sky-500 p-2 rounded-lg inp-element"
                placeholder="Enter Phone Number"
                autoComplete="mobile email"
                required
              />
            </div>
          </div>
          {error && (
            <div className="border border-red-400 p-4 rounded-xl flex gap-3 mb-5">
              <AlertCircle className="size-4 text-red-500 mt-0.5" />
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}
          <hr className="text-gray-300 my-3" />
          <div className="flex flex-col mt-7">
            <Button variant="contained" type="submit" className="flex gap-3" disabled={loading}>
              {loading ? "Submitting" : "Submit"}
              {loading && <BouncingDots />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
