import { AlertCircle, Eye, EyeClosed, GraduationCap } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Button from "../../components/ui/Button";
import { BouncingDots } from "../../components/ui/Loader";
import { isPwdMatch, isValidPwd } from "../../helpers/formValidation";
import axios from "axios";

const ResetPassword = () => {

  const { authorized, id } = useLocation()?.state || { authorized: false, id: "" };
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState({ password: "", confirm_password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [viewPassword, setViewPassword] = useState(false);

  useEffect(() => {
    if (!authorized) {
      navigate("/login", { replace: true });
      toast.error("Unauthorized");
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPassword((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      isValidPwd(newPassword.password);
      isPwdMatch(newPassword.password, newPassword.confirm_password);
      setLoading(true);
      setError("");
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/reset-password`, { password: newPassword.password, staff_id: id });
      toast.success(res.data.message);
      navigate("/login?role=staff", { replace: true });
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
              Reset Password
            </span>
          </div>
          <div className="flex flex-col gap-3 py-5">

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="font-semibold text-sm label-element"
              >
                New Password
              </label>
              <input
                type={viewPassword ? "text" : "password"}
                name="password"
                value={newPassword.password}
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
                htmlFor="confirm_password"
                className="font-semibold text-sm label-element"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirm_password"
                value={newPassword.confirm_password}
                onChange={handleInputChange}
                id="confirm_password"
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
              {loading ? "Processing" : "Reset Password"}
              {loading && <BouncingDots />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;