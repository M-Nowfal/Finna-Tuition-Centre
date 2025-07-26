import {
  AlertCircle,
  ArrowLeft,
  Eye,
  EyeClosed,
  GraduationCap
} from "lucide-react";
import Button from "../components/ui/Button";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { FTCAppContext } from "../contexts/AppContextProvider";
import { toast } from "sonner";

const Login = () => {
  const { ftcAuthRole, setFtcAuthRole } = useContext(FTCAppContext);
  const [search] = useSearchParams();
  const [ftcRole, setFtcRole] = useState("Student");
  const [viewPassword, setViewPassword] = useState(false);
  const [credentials, setCredentials] = useState({ reg_no: "", password: "", name: "", phone: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (search.get("role") === "staff") setFtcRole("Staff");
    if (ftcAuthRole.includes("STF")) {
      navigate("/dashboard/staff", { state: { role: "staff" }});
    }
  }, []);

  useEffect(() => {
    setCredentials({ reg_no: "", password: "", name: "", phone: "" });
    setError("");
  }, [ftcRole]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const role = ftcRole.toLowerCase();
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login/${role}`,
        { ...credentials }
      );
      if (role === "student") {
        localStorage.setItem("ftcAuthRole", JSON.stringify(res.data.student));
        setFtcAuthRole(res.data.student);
        navigate(`/dashboard/${role}`, { state: { role }});
      } else if (role === "staff") {
        localStorage.setItem("ftcAuthRole", JSON.stringify(res.data.staff));
        setFtcAuthRole(res.data.staff);
        navigate(`/dashboard/${role}`, { state: { role }});
      }
      toast.success(res.data.message);
    } catch (err) {
      const error = err.response?.data?.error || err.message;
      setError(error);
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
          <Link to="/" className="absolute top-10 sm:left-10">
            <div className="flex gap-2 items-center text-sky-500">
              <ArrowLeft className="size-5" />
              <span className="font-semibold">Back to Home</span>
            </div>
          </Link>
          <div className="flex justify-center items-center gap-2 text-3xl font-bold">
            <GraduationCap className="text-sky-600 size-10" />
            <h1>FTC</h1>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">Welcome Back</span>
            <p className="text-gray-600">Sign in to access your portal</p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-5"
        >
          <div className="flex flex-col items-center">
            <span className="text-2xl font-semibold">Login Portal</span>
            <p className="text-gray-600 text-sm mb-5">
              Choose your role and enter your credentials
            </p>
          </div>
          <div className="flex justify-center p-1 bg-gray-100 rounded-md">
            {["Student", "Staff"].map((role) => (
              <Button
                key={role}
                size="sm"
                variant={role === ftcRole ? "contained" : "transparent"}
                className="flex-1 text-gray-500"
                onClick={() => setFtcRole(role)}
              >
                {role}
              </Button>
            ))}
          </div>
          <div className="flex flex-col gap-3 py-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="reg_no"
                className="font-semibold text-sm label-element"
              >
                {ftcRole} Reg:No
              </label>
              <input
                type="text"
                name="reg_no"
                value={credentials.reg_no}
                onChange={handleInputChange}
                id="reg_no"
                className="outline outline-gray-300 focus:outline-sky-500 p-2 rounded-lg inp-element"
                placeholder={`Enter ${ftcRole} Reg:No`}
                required
              />
            </div>
            {ftcRole !== "Student" ? (<div className="flex flex-col gap-2">
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
                placeholder={`Enter ${ftcRole} Password`}
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
            </div>) : (
              <>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="font-semibold text-sm label-element"
                  >
                    {ftcRole} Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    value={credentials.name}
                    onChange={handleInputChange}
                    id="name"
                    className="outline outline-gray-300 focus:outline-sky-500 p-2 rounded-lg inp-element"
                    placeholder={`Enter ${ftcRole} Name`}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="phone"
                    className="font-semibold text-sm label-element"
                  >
                    {ftcRole} Phone No
                  </label>
                  <input
                    type="text"
                    name="phone"
                    autoComplete="mobile email"
                    value={credentials.phone}
                    onChange={handleInputChange}
                    id="phone"
                    className="outline outline-gray-300 focus:outline-sky-500 p-2 rounded-lg inp-element"
                    placeholder={`Enter ${ftcRole} Phone Number`}
                    required
                  />
                </div>
              </>
            )}
          </div>
          {error && (
            <div className="border border-red-400 p-4 rounded-xl flex gap-3 mb-5">
              <AlertCircle className="size-4 text-red-500 mt-0.5" />
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}
          <div className="flex flex-col">
            <Button variant="contained" type="submit">
              Sign In as {ftcRole}
            </Button>
          </div>
          {ftcRole !== "Student" && (
            <div>
              <hr className="my-5 text-gray-300" />
              <div className="flex flex-col gap-3">
                <p className="text-gray-500 text-center">New Registeration</p>
                <Button variant="outlined" onClick={() => navigate(`/register/${ftcRole.toLowerCase()}`)}>Register as {ftcRole}</Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
