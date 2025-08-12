import { IndianRupee, X } from "lucide-react";
import { getMonth, getMonthNumber } from "../../helpers/dateFormat";
import Button from "../../components/ui/Button";
import { toast } from "sonner";
import axios from "axios";
import { lazy, useState } from "react";
import { BouncingDots } from "../../components/ui/Loader";

const FeePaymentForm = ({ _id, name, roll_no, std, section, feeMonth, join_date, setConfirmFeesPaid, setStudents }) => {

  const lastFeeMonth = feeMonth ? getMonth(feeMonth + 1) : getMonth(join_date.slice(5, 7));
  const [feeRupee, setFeeRupee] = useState(std == 9 ? 900 : 1000);
  const [loading, setLoading] = useState(false);
  const date = new Date();
  const currentDate = date.getDate().toString().padStart(2, "0") + "-" + (date.getMonth() + 1).toString().padStart(2, "0") + "-" + date.getFullYear();
  const [feePaidDate, setFeePaidDate] = useState(currentDate);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const handleProceed = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const feeDetails = { _id, name, roll_no, std, section, lastFeeMonth, feeRupee, feePaidDate, paymentMethod };
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/staff/payment`, feeDetails);
      setStudents(prev => prev.map(student => (
        student._id === _id ? { ...student, roll_no: res.data.roll_no, feeRupee, feeMonth: getMonthNumber(lastFeeMonth), feePaidDate } : student
      )));
      setConfirmFeesPaid(false);
      toast.success(res.data.message);
    } catch (err) {
      const error = err.response?.data?.error || err.message;
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentMethod = (e) => {
    const { name } = e.target;
    setPaymentMethod(name);
  };

  return (
    <div className="flex flex-col fixed z-10 inset-0 bg-black/30 justify-center items-center p-4">
      <div className="w-full max-w-2xl">
        <div
          className="w-fit ms-auto cursor-pointer bg-sky-50 hover:bg-red-300 p-1 rounded-lg transition-all duration-200 mb-2"
          role="button"
          onClick={() => setConfirmFeesPaid(false)}
        >
          <X className="text-black size-5" />
        </div>
      </div>
      <form onSubmit={handleProceed} className="bg-white border overflow-y-auto scrollbar-hide max-h-[90vh] w-full max-w-2xl border-gray-400 rounded-xl p-5 ">
        <div className="flex gap-1 items-center mb-2">
          <IndianRupee className="text-sky-700 mt-1 size-5" />
          <span className="text-2xl font-semibold">Fees Payment for the month {lastFeeMonth}</span>
        </div>
        <hr className="my-2 text-gray-300" />
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-semibold text-sm ms-2">Name *</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              className="rounded-lg outline-1 p-2 outline-gray-200"
              autoComplete="off"
              readOnly
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="roll_no" className="font-semibold text-sm ms-2">Roll:No *</label>
            <input
              type="text"
              name="roll_no"
              id="roll_no"
              value={roll_no || "Not Given"}
              className="rounded-lg outline-1 p-2 outline-gray-200"
              readOnly
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="std" className="font-semibold text-sm ms-2">Class *</label>
            <input
              type="text"
              name="std"
              id="std"
              value={std + "th"}
              className="rounded-lg outline-1 p-2 outline-gray-200"
              readOnly
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="section" className="font-semibold text-sm ms-2">Section *</label>
            <input
              type="text"
              name="section"
              id="section"
              value={section}
              className="rounded-lg outline-1 p-2 outline-gray-200"
              readOnly
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="lastfeemonth" className="font-semibold text-sm ms-2">Fees Paying Month *</label>
            <input
              type="text"
              name="lastfeemonth"
              id="lastfeemonth"
              value={lastFeeMonth}
              className="rounded-lg outline-1 p-2 outline-gray-200"
              readOnly
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="feeRupee" className="font-semibold text-sm ms-2">Fee Amount *</label>
            <input
              type="number"
              name="feeRupee"
              id="feeRupee"
              value={feeRupee}
              onChange={(e) => setFeeRupee(e.target.value)}
              min={500}
              max={1500}
              required
              className="rounded-lg outline-1 p-2 outline-gray-200"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-5">
          <label htmlFor="feePaidDate" className="font-semibold text-sm ms-2">Date *</label>
          <input
            type="text"
            name="feePaidDate"
            id="feePaidDate"
            value={feePaidDate}
            className="rounded-lg outline-1 p-2 outline-gray-200"
            onChange={(e) => setFeePaidDate(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2 mt-5">
          <span className="font-semibold text-sm ms-2">Payment Method *</span>
          <div className="flex gap-5 items-center ms-1">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="cash" id="cash"
                className="size-4  cursor-pointer"
                checked={paymentMethod === "cash"}
                onClick={handlePaymentMethod}
              />
              <label htmlFor="cash" className="font-semibold  cursor-pointer">
                <img src="/money.png" alt="Cash" width={40} height={40} />
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="gPay" id="gPay"
                className="size-4  cursor-pointer"
                checked={paymentMethod === "gPay"}
                onClick={handlePaymentMethod}
              />
              <label htmlFor="gPay" className="font-semibold  cursor-pointer">
                <img src="/google-pay.png" alt="G-Py" width={50} height={50} />
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-5 gap-2">
          <Button variant="success" size="sm" className="flex-1 gap-2" type="submit" disabled={loading}>
            {loading ? "Processing" : "Proceed"}
            {loading && <BouncingDots />}
          </Button>
          <Button variant="outlined" size="sm" className="flex-1" onClick={() => setConfirmFeesPaid(false)} disabled={loading}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}

export default FeePaymentForm;