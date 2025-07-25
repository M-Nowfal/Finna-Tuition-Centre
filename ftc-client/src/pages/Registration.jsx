import {
  AlertCircle,
  ArrowLeft,
  Eye,
  EyeClosed,
  GraduationCap,
} from "lucide-react";
import Button from "../components/ui/Button";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { isPwdMatch, isValidName, isValidPh, isValidPwd } from "../helpers/formValidation";
import axios from "axios";
import { BouncingDots } from "../components/ui/Loader";

const Registration = () => {
  const { role } = useParams();
  const [viewPassword, setViewPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirm_pass: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      validation();
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_API_URL}/${role}/registration`, credentials);
      navigate("/login");
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

  const validation = () => {
    isValidName(credentials.name);
    isValidPh(credentials.phone);
    isValidPwd(credentials.password);
    isPwdMatch(credentials.password, credentials.confirm_pass);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-5 mb-5">
          <Link to="/login" className="absolute top-10 sm:left-10">
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
            <p className="text-gray-600">Create an account</p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-5"
        >
          <div className="flex flex-col items-center">
            <span className="text-2xl font-semibold">
              {role.toUpperCase()[0] + role.slice(1)} Registration
            </span>
          </div>
          <div className="flex flex-col gap-3 py-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="font-semibold text-sm label-element"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                value={credentials.name}
                onChange={handleInputChange}
                id="name"
                className="outline outline-gray-300 focus:outline-sky-500 p-2 rounded-lg inp-element"
                placeholder="Enter Name"
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
                type="text"
                name="phone"
                value={credentials.phone}
                onChange={handleInputChange}
                id="phone"
                className="outline outline-gray-300 focus:outline-sky-500 p-2 rounded-lg inp-element"
                placeholder="Enter Phone Number"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="font-semibold text-sm label-element"
              >
                E-Mail
              </label>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleInputChange}
                id="email"
                className="outline outline-gray-300 focus:outline-sky-500 p-2 rounded-lg inp-element"
                placeholder="Enter E-Mail"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="font-semibold text-sm label-element"
              >
                Password
              </label>
              <input
                type={viewPassword ? "text" : "password"}
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                id="password"
                className="outline outline-gray-300 focus:outline-sky-500 p-2 rounded-lg inp-element"
                placeholder={`Enter Password`}
                required
              />
              <div className="relative cursor-pointer">
                {viewPassword ? (
                  <Eye
                    className="absolute right-3 -top-10 text-gray-500"
                    onClick={() => setViewPassword(false)}
                  />
                ) : (
                  <EyeClosed
                    className="absolute right-3 -top-10 text-gray-500"
                    onClick={() => setViewPassword(true)}
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="confirm_pass"
                className="font-semibold text-sm label-element"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm_pass"
                value={credentials.confirm_pass}
                onChange={handleInputChange}
                id="confirm_pass"
                className="outline outline-gray-300 focus:outline-sky-500 p-2 rounded-lg inp-element"
                placeholder="Re Enter Password"
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

export default Registration;
