import { useOutletContext } from "react-router-dom";
import Overview from "../sections/staff/Overview";
import Students from "../sections/staff/Students";
import Attendance from "../sections/staff/Attendance";
import FeesDetails from "../sections/staff/FeesDetails";
import StaffSettings from "../sections/staff/StaffSettings";

const Staff = () => {
  const { activeTab, showStudentAddForm, setShowStudentAddForm, showScrollUpBtn, admin } = useOutletContext();

  switch (activeTab) {
    case "Overview":
      return <Overview />;
    case "Students":
      return (
        <Students
          showStudentAddForm={showStudentAddForm}
          setShowStudentAddForm={setShowStudentAddForm}
          showScrollUpBtn={showScrollUpBtn}
          admin={admin}
        />
      );
    case "Attendance":
      return <Attendance />;
    case "Fees":
      return <FeesDetails admin={admin} />;
    case "Settings":
      return <StaffSettings />;
    default:
      return <></>;
  }
};

export default Staff;
