import { Calendar, Home, IndianRupee, Settings, Users } from "lucide-react";
import Button from "../components/ui/Button";

const DashboardStaffSideBar = ({ activeTab, setActiveTab, showSideBar, setShowSideBar, showScrollUpBtn }) => {
  const sideBarOptions = [
    { icon: <Home className="size-4" />, title: "Overview" },
    { icon: <Users className="size-4" />, title: "Students" },
    { icon: <IndianRupee className="size-4" />, title: "Fees" },
    { icon: <Calendar className="size-4" />, title: "Attendance" },
    { icon: <Settings className="size-4" />, title: "Settings" },
  ];

  return (
    <>
      <div className={`${(showSideBar && !showScrollUpBtn) ? "hidden md:flex" : "hidden"} w-75 min-h-screen flex-col bg-white gap-4 shadow border-r border-gray-200 pt-5`}>
        {sideBarOptions.map((option, index) => (
          <Button
            key={index}
            variant={option.title === activeTab ? "contained" : "transparent"}
            className="flex gap-4 justify-start mx-5 items-center hover:bg-sky-100"
            onClick={() => setActiveTab(option.title)}
          >
            {option.icon}
            <p className="font-semibold text-sm">{option.title}</p>
          </Button>
        ))}
      </div>
      <>
        <div className={`${showSideBar ? "md:hidden" : "hidden"} inset-0 z-15 fixed`} onClick={() => setShowSideBar(false)}></div>
        <div className={`${showSideBar ? "flex md:hidden" : "hidden"} flex-col fixed bg-white shadow-xl border border-gray-300 p-2 rounded-lg left-5 top-25 z-20`}>
          {sideBarOptions.map((option, index) => (
            <Button
              key={index}
              variant={option.title === activeTab ? "contained" : "transparent"}
              className="flex gap-4 justify-start items-center hover:bg-sky-100"
              disabled={index === 4}
              onClick={() => setActiveTab(option.title)}
            >
              {option.icon}
              <p className="font-semibold text-sm">{option.title}</p>
            </Button>
          ))}
        </div>
      </>
    </>
  );
};

export default DashboardStaffSideBar;
