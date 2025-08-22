import { ChevronDown, ChevronUp, Loader2, Plus, Search, Users } from "lucide-react";
import StudentCard from "../../components/cards/StudentCard";
import Button from "../../components/ui/Button";
import { useEffect, useState } from "react";
import AddStudentForm from "./AddStudentForm";
import EditStudent from "./EditStudent";
import axios from "axios";
import { firstTwoLettersOfName } from "../../helpers/stringFormat";
import FeePaymentForm from "./FeePaymentForm";

const Students = ({ showStudentAddForm, setShowStudentAddForm, showScrollUpBtn }) => {

  const [loading, setLoading] = useState(false);
  const [showEditStudentForm, setShowEditStudentForm] = useState(false);
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [editingStudentDetails, setEditingStudentDetails] = useState({
    name: "", roll_no: "", std: "", section: "", join_date: "", parent: "", phone: "", isactive: true
  });
  const [confirmFeesPaid, setConfirmFeesPaid] = useState(false);
  const [lastFeeDetails, setLastFeeDetails] = useState({
    name: "", std: "", section: "", roll_no: "", feeMonth: "", join_date: ""
  });
  const [selectedStd, setSelectedStd] = useState(9);
  const [selectedSection, setSelectedSection] = useState("All");
  const [showSections, setShowSections] = useState(false);

  const getStudents = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/staff/getstudents/${selectedStd}?section=${selectedSection}`);
      setStudents(res.data.students || []);
    } catch (err) {
      const error = err.response?.data?.error || err.message;
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudents();
  }, [selectedStd, selectedSection]);

  useEffect(() => {
    setSelectedSection("All");
  }, [selectedStd]);

  useEffect(() => {
    setFilteredStudents(students);
  }, [students]);

  const markAttendance = async (id, success) => {
    let flag = null;
    try {
      setLoading(true);
      // API call to mark attendance
    } catch (err) {
      flag = err;
    } finally {
      setLoading(false);
      success(flag);
    }
  };

  const handleSearchStudent = (e) => {
    const { value } = e.target;
    setSearch(value);
    setFilteredStudents(
      students.filter(
        (student) =>
          student.name.toLowerCase().includes(value.toLowerCase()) ||
          student.roll_no?.includes(value)
      )
    );
  };

  return (
    <div className="p-3">
      {showStudentAddForm && (
        <AddStudentForm
          setShowStudentAddForm={setShowStudentAddForm}
          setStudents={setStudents}
          std={selectedStd}
        />
      )}
      {showEditStudentForm && (
        <EditStudent
          name={"Nowfal"}
          std={"10"}
          setShowEditStudentForm={setShowEditStudentForm}
          editingStudentDetails={editingStudentDetails}
          setStudents={setStudents}
        />
      )}
      <div className="flex relative z-10 max-w-2xl m-auto bg-gray-100 gap-3 p-1 rounded-lg mb-3">
        {[9, 10, 11, 12].map(std => (
          <Button
            key={std}
            variant={selectedStd === std ? "contained" : "secondary"}
            className="flex-1 text-gray-400"
            onClick={() => setSelectedStd(std)}
          >
            {std}<sup>th</sup>{(selectedStd === std && selectedSection !== "All") && <span>&nbsp; {selectedSection}</span>}
            {(selectedStd === std && showSections) ? (
              <ChevronUp 
                className="size-5 relative -right-2.5 md:-right-5 hover:bg-sky-500 h-full rounded"
                onClick={() => setShowSections(false)}
              />
            ) : (
              selectedStd === std && <ChevronDown
                className="size-5 relative -right-2.5 md:-right-5 hover:bg-sky-500 h-full rounded"
                onClick={() => setShowSections(true)}
              />
            )}
          </Button>
        ))}
      </div>
      {showSections && <div className="absolute inset-0" role="button" onClick={() => setShowSections(false)}></div>}
      {showSections && <div className="relative w-80 z-10 flex m-auto mb-3 gap-1 bg-gray-100 text-white p-1 rounded-md shadow-lg">
        {["All", "A", "B", "C"].map(section => (
          <Button
            key={section}
            variant={selectedSection === section ? "contained" : "secondary"}
            className="flex-1"
            onClick={() => {
              setSelectedSection(section);
              setShowSections(false);
            }}
          >
            {section}
          </Button>
        ))}
      </div>}
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <span className="font-bold text-2xl md:text-3xl">
            Student Management
          </span>
          <p className="text-gray-500">
            Manage student profiles and information
          </p>
          <div className="sm:w-90 lg:w-125 mt-4 mb-2 flex">
            <div className="relative">
              <Search className="absolute top-3.5 left-2 size-4 text-gray-500" />
            </div>
            <input
              type="search"
              name="search-btn"
              id="search-btn"
              value={search}
              onChange={handleSearchStudent}
              className="border border-gray-300 bg-white text-sm w-full p-2 py-3 ps-8 rounded-md"
              placeholder="Search students by name or class..."
            />
          </div>
        </div>
        <Button
          variant="contained"
          size="sm"
          className="gap-1"
          onClick={() => setShowStudentAddForm(true)}
        >
          <Plus className="size-5 sm:size-4" />
          <span className="hidden sm:flex text-sm">Add Student</span>
        </Button>
      </div>
      {/* Confirm Fee */}
      {confirmFeesPaid && <FeePaymentForm
        _id={lastFeeDetails._id}
        name={lastFeeDetails.name}
        std={lastFeeDetails.std}
        section={lastFeeDetails.section}
        roll_no={lastFeeDetails.roll_no}
        feeMonth={lastFeeDetails.feeMonth}
        join_date={lastFeeDetails.join_date}
        setConfirmFeesPaid={setConfirmFeesPaid}
        setStudents={setStudents}
      />}
      <div className={`mt-5 grid md:grid-cols-2 xl:grid-cols-3 ${!showScrollUpBtn ? "" : "2xl:grid-cols-4"} gap-5`}>
        {filteredStudents.length !== 0 && (
          filteredStudents.map(({
            _id, name, std, section, roll_no, parent, phone, join_date,
            feeMonth, feeRupee, attendance, isActive, feePaidDate, school
          }) => (
            <StudentCard
              key={_id} _id={_id} name={name}
              std={std} section={section} roll_no={roll_no}
              parent={parent} phone={phone} join_date={join_date.split("T")[0]}
              feeRupee={feeRupee} feeMonth={feeMonth}
              attendance={attendance}
              shortName={firstTwoLettersOfName(name)}
              markAttendance={markAttendance}
              setShowEditStudentForm={setShowEditStudentForm}
              setEditingStudentDetails={setEditingStudentDetails}
              setConfirmFeesPaid={setConfirmFeesPaid}
              setLastFeeDetails={setLastFeeDetails}
              isActive={isActive}
              feePaidDate={feePaidDate}
              school={school}
            />
          ))
        )}
      </div>
      {filteredStudents.length === 0 && (
        loading ? (
          <div className="flex justify-center h-[50vh] items-center">
            <Loader2 className="animate-spin size-10 text-sky-700" />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 mt-20">
            <Users className="size-17 text-gray-300" />
            <span className="font-semibold text-xl">No students found</span>
            <p className="text-gray-500">
              Try adjusting your search or add a new student.
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default Students;
