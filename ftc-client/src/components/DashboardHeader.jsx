import { Bell, CircleX, GraduationCap, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import { useState } from "react";

const DashboardHeader = ({ role }) => {
  const [showUserInfo, setShowUserInfo] = useState(false);

  return (
    <div className="flex items-center justify-between bg-white py-3 md:py-4 px-5 shadow border-b border-gray-200">
      <div className="flex items-center gap-3">
        <GraduationCap className="text-sky-600 size-10" />
        <span className="text-2xl font-bold">FTC {role.toUpperCase()[0] + role.slice(1)} Dashboard</span>
        <div className="bg-sky-100 px-2 rounded-2xl">
          <p className="hidden sm:block text-sm text-sky-700">{role.toUpperCase()[0] + role.slice(1)} Member</p>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-3">
        <Bell className="text-gray-600" />
        <span className="font-semibold">Muhammed Nowfal</span>
        <Link to="/">
          <Button variant="danger-outlined" size="sm">
            <LogOut className="size-5 me-3" />
            Log-Out
          </Button>
        </Link>
      </div>
      <div className="flex md:hidden">
        <button
          className="cursor-pointer"
          onClick={() => setShowUserInfo((prev) => !prev)}
        >
          <User className="bg-sky-200 shadow rounded-full p-2 size-10" />
        </button>
        {showUserInfo && (
          <div className="absolute top-20 right-5">
            <button
              className="cursor-pointer"
              onClick={() => setShowUserInfo((prev) => !prev)}
            >
              <CircleX className="text-red-400 size-5 absolute top-3 right-0" />
            </button>
            <div className="p-3 rounded-xl flex flex-col gap-3 bg-gray-50 shadow-md">
              <strong>Muhammed Nowfal</strong>
              <Link to="/" className="flex justify-center">
                <Button variant="outlined" size="sm">
                  <LogOut className="size-5 me-3" />
                  Log-Out
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
