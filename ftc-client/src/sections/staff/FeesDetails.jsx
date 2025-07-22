import { AlertTriangle, Calendar, CheckCircle, Filter, IndianRupee, Loader2, Search, Share, Users } from "lucide-react";
import OverviewCard from "../../components/cards/OverviewCard";
import Button from "../../components/ui/Button";
import { useRef, useState } from "react";
import FeeStatusCard from "../../components/cards/FeeStatusCard";
import { useEffect } from "react";
import { firstTwoLettersOfName } from "../../helpers/stringFormat";
import axios from "axios";
import FeePaymentForm from "./FeePaymentForm";

const FeesDetails = () => {

  const [feesOverviewsValues, setFeesOverviewsValues] = useState({
    total_student: 0, fee_paid: 0, fee_pending: 0, revenue: 0
  });

  const feesOverviews = [
    {
      title: "Total Student",
      icon: <Users className="text-sky-500" />,
      num: feesOverviewsValues.total_student,
      msg: "Enrolled students",
    },
    {
      title: "Fees Paid",
      icon: <CheckCircle className="text-emerald-500" />,
      num: feesOverviewsValues.fee_paid,
      msg: "Total Paid",
    },
    {
      title: "Fees Pending",
      icon: <AlertTriangle className="text-amber-600" />,
      num: feesOverviewsValues.fee_pending,
      msg: "Payment pending",
    },
    {
      title: "Revenue",
      icon: <IndianRupee className="text-purple-600" />,
      num: feesOverviewsValues.revenue,
      msg: "This month",
    },
  ];

  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const filterByFee = useRef("AllStudents");
  const [selectedStd, setSelectedStd] = useState(9);
  const currentMonth = new Date().getMonth() + 1;
  const [confirmFeesPaid, setConfirmFeesPaid] = useState(false);
  const [feeDetails, setFeeDetails] = useState({
    _id: "", name: "", std: "", section: "", roll_no: "", 
    feeMonth: "", join_date: ""
  });

  const getFeeOverviewValues = (students) => {
    const total_student = students.length;
    const fee_paid = (students.filter(student => student.feeMonth == currentMonth)).length;
    const fee_pending = (students.filter(student => student.feeMonth != currentMonth)).length;
    const revenue = students.reduce((acc, student) => {
      const total = acc + Number(student.feeRupee);
      return student.feeMonth == currentMonth ? total : acc;
    }, 0);
    setFeesOverviewsValues(
      { total_student, fee_paid, fee_pending, revenue }
    );
  };

  const getStudents = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/staff/getstudents/${selectedStd}`);
      setStudents(res.data.students || []);
      getFeeOverviewValues(res.data.students || []);
      setFilteredStudents(res.data.students || []);
    } catch (err) {
      const error = err.response?.data?.error || err.message;
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  const filterStudents = (e) => {
    const { value } = e.target;
    setSearch(value);
    setFilteredStudents(students.filter(student => (
      student.name.toLowerCase().includes(value.toLowerCase()) ||
      student.roll_no.includes(value)
    )));
  };

  const filterStudentsByFee = () => {
    switch (filterByFee.current) {
      case "AllStudents":
        setFilteredStudents(students);
        break;
      case "FeesPaid":
        setFilteredStudents(students.filter(student => (
          student.feeMonth == currentMonth
        )));
        break;
      case "FeesPending":
        setFilteredStudents(students.filter(student => (
          student.feeMonth != currentMonth
        )));
        break;
      default:
        setFilteredStudents(students);
    }
  };

  useEffect(() => {
    getStudents();
    filterByFee.current = "AllStudents";
  }, [selectedStd]);

  useEffect(() => {
    getFeeOverviewValues(students);
    filterStudentsByFee();
  }, [students]);

  return (
    <div className="p-3">
      <div className="flex max-w-2xl m-auto bg-gray-100 gap-3 p-1 rounded-lg mb-3">
        {[9, 10, 11, 12].map(std => (
          <Button
            key={std}
            variant={selectedStd === std ? "contained" : "secondary"}
            className="flex-1 text-gray-400"
            onClick={() => setSelectedStd(std)}
          >
            {std}<sup>th</sup>
          </Button>
        ))}
      </div>
      <div className="bg-gray-50 flex flex-col gap-3">
        <div className="flex flex-col gap-2 ps-2">
          <span className="text-3xl font-bold">Fees Management</span>
          <p className="text-gray-600">Manage student fee payments and status</p>
        </div>
        <div className="grid w-full sm:grid-cols-2 lg:grid-cols-4 gap-2 md:mt-5">
          {feesOverviews.map((overview, index) => (
            <OverviewCard
              key={index}
              title={overview.title}
              icon={overview.icon}
              num={overview.num}
              msg={overview.msg}
              i={index}
            />
          ))}
        </div>
        <div className="flex flex-col gap-3 bg-white border border-gray-200 p-3 rounded-xl md:mx-2">
          <div className="md:flex justify-between items-center">
            <div className="flex flex-col">
              <div className="flex gap-1 items-center">
                <IndianRupee className="text-sky-500 size-5" />
                <span className="text-2xl font-semibold">Fee Payment Management</span>
              </div>
              <p className="text-gray-500">
                Track and manage student fee payments
              </p>
            </div>
            <div className="flex gap-2 justify-end mt-3">
              <Button variant="secondary-outlined" size="sm">
                <Share className="size-4 me-2" />
                Export
              </Button>
              <Button variant="secondary-outlined" size="sm">
                <Calendar className="size-4 me-2" />
                Monthly Report
              </Button>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="sm:w-90 mt-2 mb-2 flex-1">
              <div className="relative">
                <Search className="absolute top-3.5 left-2 size-4 text-gray-500" />
              </div>
              <input
                type="search"
                name="search-btn"
                id="search-btn"
                value={search}
                onChange={filterStudents}
                className="border border-gray-300 bg-white text-sm w-full p-2 py-3 ps-8 rounded-md"
                placeholder="Search students by name or class..."
              />
            </div>
            <Filter className="text-gray-400 size-4" />
            <select
              name="feesFilter"
              id="feesFilter"
              className="border border-gray-300 bg-white text-sm rounded-md py-3 mt-1 ps-2"
              value={filterByFee.current}
              onChange={(e) => {
                filterByFee.current = e.target.value;
                filterStudentsByFee();
              }}
            >
              <option value="AllStudents">All Students</option>
              <option value="FeesPaid">Fees Paid</option>
              <option value="FeesPending">Fees Pending</option>
            </select>
          </div>
          {loading && <div className="flex justify-center items-center h-[20vh]">
            <Loader2 className="size-10 text-sky-700 animate-spin" />
          </div>}
          {filteredStudents.map(({ _id, name, roll_no, std, section, feeRupee, feeMonth, phone, join_date }) => (
            <FeeStatusCard
              key={_id}
              _id={_id}
              name={name} roll_no={roll_no}
              shortName={firstTwoLettersOfName(name)} std={std} 
              join_date={join_date}
              section={section} feeRupee={feeRupee} 
              feeMonth={feeMonth} phone={phone}
              setConfirmFeesPaid={setConfirmFeesPaid}
              setFeeDetails={setFeeDetails}
            />
          ))}
          {students.length === 0 && (
            <div className="flex justify-center items-center h-[20vh]">
              <div className="flex flex-col items-center gap-5">
                <Users className="text-gray-300 size-17" />
                <span className="text-gray-900">No students enrolled in class {selectedStd}<sup>th</sup></span>
              </div>
            </div>
          )}
        </div>
      </div>
      {confirmFeesPaid && <FeePaymentForm 
        _id={feeDetails._id}
        name={feeDetails.name}
        std={feeDetails.std}
        section={feeDetails.section}
        roll_no={feeDetails.roll_no}
        feeMonth={feeDetails.feeMonth}
        join_date={feeDetails.join_date}
        setConfirmFeesPaid={setConfirmFeesPaid}
        setStudents={setStudents}
      />}
    </div>
  );
}

export default FeesDetails;
