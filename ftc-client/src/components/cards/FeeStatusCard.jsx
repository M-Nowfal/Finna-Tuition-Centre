import { CircleCheck, CircleX, IndianRupee } from "lucide-react";
import Button from "../ui/Button";

const FeeStatusCard = ({ 
  _id, name, shortName, roll_no, std, section, feeMonth, 
  phone, join_date, setConfirmFeesPaid, setFeeDetails, isActive 
}) => {

  const paid = (feeMonth == new Date().getMonth() + 1);
  const feeRupee = std == "9" ? 900 : 1000;

  return (
    <div className="bg-gray-100 flex w-full rounded-xl p-3">
      <div className={`flex w-full items-center ${!isActive && "opacity-30"}`}>
        <div className="flex-1 flex items-center gap-3">
          <div className="bg-sky-200 rounded-full p-2.5 font-semibold text-lg text-sky-950">
            {shortName}
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold">{name}</span>
            <div className="text-gray-700 flex flex-col gap-1">
              <div>
                <span className="text-sm">
                  {std}
                  <sup>th</sup> Std {section}
                </span>
                <span className="font-bold text-gray-950"> {roll_no}</span>
              </div>
              <span className="text-gray-500">{phone}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 md:gap-5 items-center">
          <div className="flex flex-col">
            <div className="flex items-center">
              <IndianRupee className="size-3" />
              <span className="text-xl font-semibold">{feeRupee}</span>
            </div>
            <span className="hidden sm:block text-xs text-gray-500">Monthly Fee</span>
          </div>
          <div className={`${paid ? "bg-green-400/20 text-emerald-900" : "bg-red-400/20 text-red-800"}  py-1 flex items-center gap-1 rounded-full px-2 text-xs font-semibold`}>
            {paid ? <CircleCheck className="size-3" /> : <CircleX className="size-3" />}
            {paid ? "Paid" : "Pending"}
          </div>
          {!paid ? <Button variant="success" size="sm" 
            onClick={() => {
              setFeeDetails({
                _id, name, roll_no, std, section, feeMonth, feeRupee, join_date
              });
              setConfirmFeesPaid(true);
              }}
            disabled={!isActive}
            >
            Mark Paid
          </Button> : <Button variant="secondary" size="sm">
            Fees Paid
          </Button>}
        </div>
      </div>
    </div>
  );
}

export default FeeStatusCard;