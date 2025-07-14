import { Calendar, Home, IndianRupee, Settings, Users } from "lucide-react";
import Button from "../components/ui/Button";

const DashboardStaffSideBar = ({ activeTab, setActiveTab }) => {

  const sideBarOptions = [
    { icon: <Home className="size-4" />, title: "Overview" },
    { icon: <Users className="size-4" />, title: "Students" },
    { icon: <Calendar className="size-4" />, title: "Attendance" },
    { icon: <IndianRupee className="size-4" />, title: "Fees" },
    { icon: <Settings className="size-4" />, title: "Settings" },
  ];

  return (
    <div className="hidden md:flex w-75 h-screen flex-col bg-white gap-4 shadow border-r border-gray-200 pt-5">
      {sideBarOptions.map((option, index) => (
        <Button
          key={index}
          variant={
            option.title === activeTab ? "contained" : "transparent"
          }
          className="flex gap-4 justify-start mx-5 items-center hover:bg-sky-100"
          onClick={() => setActiveTab(option.title)}
        >
          {option.icon}
          <p className="font-semibold text-sm">{option.title}</p>
        </Button>
      ))}
    </div>
  );
};

export default DashboardStaffSideBar;
