import { Calendar, Copy, Loader2, Users, X } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../../components/ui/Button";
import axios from "axios";
import StdandSecLayout from "../../layouts/StdandSecLayout";
import AttendanceCard from "../../components/cards/AttendanceCard";
import { getMonth, getToDay } from "../../helpers/dateFormat";
import { toast } from "sonner";

const Attendance = () => {

  const date = new Date();
  const today = `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getFullYear()}`;
  const [selectedStd, setSelectedStd] = useState(9);
  const [selectedSection, setSelectedSection] = useState("A");
  const [showSections, setShowSections] = useState();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [attendance, setAttendance] = useState({});
  const [todayAttendance, setTodayAttendance] = useState({ present: 0, absent: 0 });
  const [subject, setSubject] = useState("");
  const [finalAttendance, setFinalAttendance] = useState({
    std: 9,
    section: "A",
    date: `${date.getDate()}-${getMonth(date.getMonth() + 1)}-${date.getFullYear()}`,
    day: "",
    subject: "",
    no_on_roll: 0,
    no_of_present: 0,
    no_of_absent: 0,
    absentees: []
  });
  const [showAttendance, setShowAttendance] = useState(false);
  const stdRoman = { 9: "IX", 10: "X", 11: "XI", 12: "XII" };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/staff/getstudents/${selectedStd}?section=${selectedSection}`);
        const activeStudents = res.data.students.filter(student => student.isActive);
        setStudents(activeStudents || []);
        res.data.students.map(student => {
          const id = student._id;
          student.isActive && setAttendance(prev => ({ ...prev, [`${id}`]: false }));
        });
        setTodayAttendance(prev => ({ present: 0, absent: activeStudents.length }));
        setFinalAttendance(prev => ({
          ...prev,
          no_on_roll: activeStudents.length,
          no_of_present: 0, no_of_absent: activeStudents.length
        }));
      } catch (err) {
        const error = err.response?.data?.error || err.message;
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [selectedStd, selectedSection]);

  const markPresent = (id) => {
    setAttendance(prev => {
      if (!prev[id])
        setTodayAttendance({
          present: todayAttendance.present + 1,
          absent: todayAttendance.absent - 1
        });
      else
        setTodayAttendance({
          present: todayAttendance.present - 1,
          absent: todayAttendance.absent + 1
        });
      return { ...prev, [id]: !prev[id] };
    });
  };

  const markAllPresent = () => {
    students.map(student => {
      const id = student._id;
      setAttendance(prev => ({ ...prev, [`${id}`]: true }));
    });
    setTodayAttendance({ present: students.length, absent: 0 });
  };

  const getAbsentees = () => {
    const absentees = [];
    for (const atd in attendance) {
      if (!attendance[atd])
        absentees.push(atd);
    }
    return absentees;
  };

  const generateAttendance = () => {
    if (!subject) {
      toast.warning("Select today's Subject");
      return;
    }
    setFinalAttendance({
      std: selectedStd,
      section: selectedSection,
      date: `${date.getDate()}-${getMonth(date.getMonth() + 1)}-${date.getFullYear()}`,
      day: `${date.getDay()}`,
      subject,
      no_on_roll: students.length,
      no_of_present: todayAttendance.present,
      no_of_absent: todayAttendance.absent,
      absentees: getAbsentees()
    });
    setShowAttendance(true);
  };

  const getNameById = (id) => {
    for (const student of students) {
      if (student._id === id)
        return student.name;
    }
  };

  const handleCopy = () => {
    const absenteesList = finalAttendance.absentees.map((id, index) => `${index + 1}. ${getNameById(id)}`).join("\n\t");
    navigator.clipboard.writeText(`
*${stdRoman[finalAttendance.std]} STD ${finalAttendance.section} Attendance*

  *Date          :* ${finalAttendance.date}
  *Day           :* ${getToDay(date.getDay())}
  *Subject       :* ${finalAttendance.subject} 
  *No:on:roll    :* ${finalAttendance.no_on_roll}
  *No:of:present :* ${finalAttendance.no_of_present}
  *No:of:absent  :* ${finalAttendance.no_of_absent}

*Absentees*
  ${absenteesList}
    `);
    toast.success("Attendance copied to clipboard");
  };

  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="flex gap-2 items-center">
        <Calendar className="text-emerald-600" />
        <span className="text-2xl font-semibold">
          Attendance for&nbsp;
          <span className="font-bold text-sky-900 border border-gray-300 bg-sky-100 px-2 rounded-md">
            {today}
          </span>
        </span>
      </div>

      {/* Attendance */}
      {showAttendance && (
        <div className="fixed flex flex-col z-10 p-4 justify-center items-center min-h-svh inset-0 bg-black/30">
          <div className="w-full max-h-[70vh] max-w-2xl">
            <div
              className="w-fit ms-auto cursor-pointer bg-sky-50 p-1 rounded-lg transition-all duration-200 mb-2"
              role="button"
              onClick={() => setShowAttendance(false)}
            >
              <X className="text-black size-5" />
            </div>
            <div className="flex flex-col items-center bg-white p-5 border border-gray-400 shadow rounded-2xl gap-3 w-full md:w-2xl">
              <div className="flex gap-4 items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <Calendar className="text-emerald-500 size-8" />
                  <h2 className="text-xl font-semibold">Attendance</h2>
                </div>
                <span className="font-bold text-emerald-900 border border-gray-300 bg-emerald-100 text-2xl px-2 rounded-md">{today}</span>
              </div>
              <div className="flex flex-col gap-5 bg-sky-100 p-5 rounded-lg border border-gray-200 shadow w-full md:w-md">
                <h2 className="flex text-xl font-bold items-center gap-2">
                  <p>{stdRoman[finalAttendance.std]}</p> STD <p>{finalAttendance.section}</p> Attendance
                </h2>
                <div className="flex flex-col gap-1">
                  <p>
                    <span className="font-bold text-lg">Date: </span>
                    <span className="font-semibold text-lg">{finalAttendance.date}</span>
                  </p>
                  <p>
                    <span className="font-bold text-lg">Day: </span>
                    <span className="font-semibold text-lg">{getToDay(date.getDay())}</span>
                  </p>
                  <p>
                    <span className="font-bold text-lg">Subject: </span>
                    <span className="font-semibold text-lg">{finalAttendance.subject}</span>
                  </p>
                  <p>
                    <span className="font-bold text-lg">No:on:roll: </span>
                    <span className="font-semibold text-lg">{finalAttendance.no_on_roll}</span>
                  </p>
                  <p>
                    <span className="font-bold text-lg">No:of:present: </span>
                    <span className="font-semibold text-lg">{finalAttendance.no_of_present}</span>
                  </p>
                  <p>
                    <span className="font-bold text-lg">No:of:absent: </span>
                    <span className="font-semibold text-lg">{finalAttendance.no_of_absent}</span>
                  </p>
                  <div className="mt-5">
                    <p className="font-bold text-xl">Absentees</p>
                    <ol className="ps-10 list-decimal">
                      {finalAttendance.absentees.map(absentees => (
                        getNameById(absentees) && <li key={absentees}>{getNameById(absentees)}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
              <div className="flex justify-end w-full">
                <Button
                  variant="contained"
                  size="xs"
                  className="flex gap-1 items-center"
                  onClick={handleCopy}
                ><Copy size={17} /> Copy</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <StdandSecLayout
        selectedStd={selectedStd}
        setSelectedStd={setSelectedStd}
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
        showSections={showSections}
        setShowSections={setShowSections}
        attendancePage
      />
      <div className="flex justify-between gap-2">
        <select
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="flex-1 max-w-xl border p-2 font-semibold border-gray-300 rounded-md"
        >
          <option value="">Select Today's Subject</option>
          <option value="Tamil">Tamil</option>
          <option value="English">English</option>
          <option value="Maths">Maths</option>
          <option value="Science">Science</option>
          <option value="Social Science">Social Science</option>
        </select>
        <Button
          variant={students.length === todayAttendance.present ? "success" : "contained"}
          size="sm"
          onClick={markAllPresent}
        >
          {students.length === todayAttendance.present ? "All Present" : "Mark All Present"}
        </Button>
      </div>
      <div className="flex justify-center items-center">
        {!loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 w-full">
            {students.map(({
              _id, name, std, section, roll_no, phone, join_date,
              isActive, school
            }) => (
              <AttendanceCard
                key={_id}
                _id={_id}
                name={name}
                std={std}
                section={section}
                roll_no={roll_no}
                phone={phone}
                join_date={join_date}
                isActive={isActive}
                school={school}
                markPresent={markPresent}
                attendance={attendance}
              />
            ))}
          </div>) : (
          <div className="flex items-center justify-center min-h-[50vh]">
            <Loader2 className="animate-spin size-15 text-sky-500" />
          </div>
        )}
      </div>
      {students.length === 0 && (
        <div className="flex flex-col items-center gap-3 my-10">
          <Users className="size-17 text-gray-300" />
          <span className="font-semibold text-xl">No students found</span>
          <p className="text-gray-500">
            Try adjusting your search or add a new student.
          </p>
        </div>
      )}
      {!loading && <div className="flex flex-col items-center w-full max-w-2xl m-auto gap-5 mb-20 border border-gray-300 hover:shadow-xl bg-sky-100 rounded-xl p-3 mt-3">
        <div className="flex flex-col gap-2 w-full p-3">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-semibold">No:on:Roll</span>
            <span className="text-3xl font-bold">{students.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-semibold">No:of:Present</span>
            <span className="text-3xl font-bold">{todayAttendance.present}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-semibold">No:of:absent</span>
            <span className="text-3xl font-bold">{todayAttendance.absent}</span>
          </div>
        </div>
        <Button
          variant="success"
          className="w-full"
          onClick={generateAttendance}
        >
          Generate Attendance
        </Button>
      </div>}
    </div>
  );
}

export default Attendance;
