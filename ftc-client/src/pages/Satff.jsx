import { useOutletContext } from "react-router-dom";
import Overview from "../sections/staff/Overview";
import Students from "../sections/staff/Students";

const Staff = () => {
  const { activeTab } = useOutletContext();

  switch (activeTab) {
    case "Overview":
      return <Overview />;
    case "Students":
      return <Students />;
    case "Attendance":
      return <div>Attendance Tab</div>;
    case "Fees Management":
      return <div>Fees Management Tab</div>;
    case "Settings":
      return <div>Settings Tab</div>;
    default:
      return <div>Invalid Tab</div>;
  }
};

export default Staff;
