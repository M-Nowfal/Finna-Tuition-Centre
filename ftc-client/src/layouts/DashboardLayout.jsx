import { Outlet, useLocation, useNavigate } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";
import DashboardStaffSideBar from "../components/DashboardStaffSideBar";
import { useEffect, useState } from "react";

const DashboardLayout = () => {
  const { role } = useLocation().state || { role: "" };
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");
  const [showSideBar, setShowSideBar] = useState(false);
  const [showStudentAddForm, setShowStudentAddForm] = useState(false);

  useEffect(() => {
    if (role !== "staff" && role !== "student" && role !== "admin") {
      navigate("/pagenotfound");
      return;
    }
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <DashboardHeader
        role={role}
        setShowSideBar={setShowSideBar}
      />
      <div className="flex">
        {role === "staff" && (
          <DashboardStaffSideBar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            showSideBar={showSideBar}
            setShowSideBar={setShowSideBar}
          />
        )}
        <section className="w-full">
          <Outlet context={{ activeTab, showStudentAddForm, setShowStudentAddForm }} />
        </section>
      </div>
    </div>
  );
};

export default DashboardLayout;
