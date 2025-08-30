import { useContext } from "react";
import { FTCAppContext } from "../../contexts/AppContextProvider";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import { Settings } from "lucide-react";

const StaffSettings = () => {

  const { ftcAuthRole } = useContext(FTCAppContext);
  const admin = (ftcAuthRole.staff_id === import.meta.env.VITE_ADMIN_ID);

  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="flex gap-2 items-center">
        <Settings className="animate-[spin_3s_linear_infinite] text-gray-600 size-8" />
        <p className="text-2xl font-bold">Settings</p>
      </div>
      <div className="text-center w-full">
        {admin ? (
          <div className="flex flex-col gap-3">
            <div className="bg-white shadow p-3 rounded-lg flex items-center justify-between">
              <p className="text-gray-600 text-lg">Add new staff</p>
              <Link to={"/add-staff"}>
                <Button variant="contained" size="sm">Add Staff</Button>
              </Link>
            </div>
            <div className="bg-white shadow p-3 rounded-lg flex items-center justify-between">
              <p className="text-gray-600 text-lg">Add new admin</p>
              <Link to={"/add-admin"}>
                <Button variant="contained" size="sm">Add Admin</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow p-3 rounded-lg flex items-center justify-between">
            <p className="text-gray-600 text-lg">Settings will be added soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StaffSettings;