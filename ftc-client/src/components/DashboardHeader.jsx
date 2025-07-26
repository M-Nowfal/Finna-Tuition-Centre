import { Edit, GraduationCap, Home, LogOut, Menu, User, X } from "lucide-react";
import Button from "../components/ui/Button";
import Alert from "../components/ui/Alert";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FTCAppContext } from "../contexts/AppContextProvider";
import EditStaff from "../sections/staff/EditStaff";

const DashboardHeader = ({ role, setShowSideBar }) => {
  const { ftcAuthRole, setFtcAuthRole } = useContext(FTCAppContext);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showEditStaffForm, setShowEditStaffForm] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("ftcAuthRole");
    setFtcAuthRole("guest");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between bg-white py-3 md:py-4 px-5 shadow border-b border-gray-200">
      <div className="flex items-center gap-3">
        <Menu
          className="size-5 md:size-7 cursor-pointer"
          onClick={() => setShowSideBar((prev) => !prev)}
        />
        <GraduationCap className="text-sky-600 size-10" />
        <span className="text-2xl font-bold">
          FTC {role.toUpperCase()[0] + role.slice(1)} Dashboard
        </span>
        <div className="bg-sky-100 px-2 rounded-2xl">
          <p className="hidden sm:block text-sm text-sky-700">
            {role.toUpperCase()[0] + role.slice(1)} Member
          </p>
        </div>
      </div>
      <div className="flex">
        <button
          className="cursor-pointer"
          onClick={() => setShowUserInfo((prev) => !prev)}
        >
          <User className="bg-sky-200 shadow rounded-full p-2 size-10" />
        </button>
        {showUserInfo && (
          <>
            <div className="fixed z-10 inset-0" onClick={() => setShowUserInfo((prev) => !prev)}></div>
            <div className="fixed top-20 right-7 z-20">
              <div className="rounded-xl flex flex-col gap-5 bg-white shadow-md border border-gray-300 p-5">
                <div 
                  className="ms-auto cursor-pointer hover:bg-sky-100 p-1 rounded-lg transition-all duration-200"
                  role="button"
                  onClick={() => {
                    setShowEditStaffForm(true);
                    setShowUserInfo(false);
                  }}
                >
                  <Edit className="text-gray-500" />
                </div>
                <div className="flex justify-center">
                  <User className="size-22 bg-gray-300 p-2 text-white rounded-full" />
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <strong className="text-lg">{ftcAuthRole.name}</strong>
                  <span className="font-semibold">{ftcAuthRole.staff_id}</span>
                  <p className="text-gray-900">{ftcAuthRole.phone}</p>
                  <p className="text-sky-600">{ftcAuthRole.email}</p>
                </div>
                <div className="flex justify-center gap-2">
                  <Button variant="outlined" size="sm" onClick={() => navigate("/")}>
                    <Home className="size-4 me-1" />
                    Home
                  </Button>
                  <Button variant="danger-outlined" size="sm" onClick={() => setShowAlert(true)}>
                    <LogOut className="size-4 me-1" />
                    Log-Out
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {showAlert && <Alert
        title="Logout"
        msg="Are you sure to logut the current session"
        proceed={logout}
        btn="Logout"
        setShowAlert={setShowAlert}
      />}
      {showEditStaffForm && <EditStaff 
        old_details={ftcAuthRole}
        setShowEditStaffForm={setShowEditStaffForm}
      />}
    </div>
  );
};

export default DashboardHeader;
