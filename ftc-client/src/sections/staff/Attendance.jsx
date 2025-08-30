import { Calendar, Copy, Loader, Loader2, Save, Users, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Button from "../../components/ui/Button";
import axios from "axios";
import StdandSecLayout from "../../layouts/StdandSecLayout";
import AttendanceCard from "../../components/cards/AttendanceCard";
import { getMonth, getToDay } from "../../helpers/dateFormat";
import { toast } from "sonner";
import Alert from "../../components/ui/Alert";

const Attendance = () => {

  const date = new Date();
  const today = `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getFullYear()}`;
  const [selectedStd, setSelectedStd] = useState(9);
  const [selectedSection, setSelectedSection] = useState("A");
  const [showSections, setShowSections] = useState();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [attendance, setAttendance] = useState({ present: 0, absent: 0 });
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
  const selectedSubject = useRef();
  const [copy, setCopy] = useState(false);
  let timeOut = null;
  const [pastAttendance, setPastAttendance] = useState(null);
  const [showPastAtd, setShowPastAtd] = useState(false);
  const [searchingAtd, setSearchingAtd] = useState({
    date: "", std: 9, section: "A"
  });
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/staff/getstudents/${selectedStd}?section=${selectedSection}`);
        const activeStudents = res.data.students.filter(student => student.isActive);
        setStudents(activeStudents || []);
        setAttendance({ present: 0, absent: 0 });
        res.data.students.map(student => {
          const id = student._id;
          student.isActive && setAttendance(prev => ({ ...prev, [`${id}`]: false }));
        });
        setAttendance(prev => ({ ...prev, present: 0, absent: activeStudents.length }));
        setFinalAttendance(prev => ({
          ...prev,
          date: `${date.getDate()}-${getMonth(date.getMonth() + 1)}-${date.getFullYear()}`,
          no_on_roll: activeStudents.length,
          no_of_present: 0,
          no_of_absent: activeStudents.length,
          absentees: [],
          std: selectedStd,
          section: selectedSection,
          subject: selectedSubject
        }));
      } catch (err) {
        const error = err.response?.data?.error || err.message;
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();

    return () => clearTimeout(timeOut);
  }, [selectedStd, selectedSection]);

  const markPresent = (id) => {
    setAttendance(prev => {
      let present = 0;
      let absent = 0;
      if (!prev[id]) {
        present = prev["present"] + 1;
        absent = prev["absent"] - 1;
      } else {
        present = prev["present"] - 1;
        absent = prev["absent"] + 1;
      }
      return {
        ...prev,
        [id]: !prev[id],
        present,
        absent
      };
    });
  };

  const markAllPresent = () => {
    students.map(student => {
      const id = student._id;
      setAttendance(prev => ({ ...prev, [`${id}`]: true }));
    });
    setAttendance(prev => ({ ...prev, present: students.length, absent: 0 }));
  };

  const getAbsentees = () => {
    const absentees = [];
    for (const atd in attendance) {
      if (atd === "absent" || atd === "present") continue;
      if (!attendance[atd])
        absentees.push(atd);
    }
    return absentees;
  };

  const generateAttendance = () => {
    if (!subject) {
      toast.warning("Select today's Subject");
      selectedSubject.current.focus();
      return;
    }
    setFinalAttendance({
      std: selectedStd,
      section: selectedSection,
      date: `${date.getDate()}-${getMonth(date.getMonth() + 1)}-${date.getFullYear()}`,
      day: `${date.getDay()}`,
      subject,
      no_on_roll: students.length,
      no_of_present: attendance.present,
      no_of_absent: attendance.absent,
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

  const getAttendance = () => {
    const absenteesList = finalAttendance.absentees.map((id, index) => `  ${index + 1}. ${getNameById(id)}`).join("\n  ");
    return (`
*${stdRoman[finalAttendance.std]} STD ${finalAttendance.section} Attendance*
*------------------------*
  *Date              :* ${finalAttendance.date}
  *Day               :* ${getToDay(date.getDay())}
  *Subject          :* ${finalAttendance.subject} 
  *No:on:roll      :* ${finalAttendance.no_on_roll}
  *No:of:present :* ${finalAttendance.no_of_present}
  *No:of:absent  :* ${finalAttendance.no_of_absent}

*Absentees*
  ${absenteesList} ${!absenteesList ? "NILL" : ""}
    `);
  };

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(getAttendance());
      toast.success("Attendance copied to clipboard");
      setCopy(true);
      timeOut = setTimeout(() => { setCopy(false) }, 2500);
    } catch (err) {
      setCopy(false);
    }
  };

  const handleSave = async () => {

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/staff/update-attendance`,
        {
          std: `${stdRoman[finalAttendance.std]} STD ${finalAttendance.section} Attendance`,
          details: {
            date: `${finalAttendance.date}`,
            day: `${getToDay(date.getDay())}`,
            subject: `${finalAttendance.subject} `,
            no_on_roll: `${finalAttendance.no_on_roll}`,
            no_of_present: `${finalAttendance.no_of_present}`,
            no_of_absent: `${finalAttendance.no_of_absent}`
          },
          absentees: finalAttendance.absentees.map((id, index) => getNameById(id))
        }
      );
      toast.success(res.data.message);
    } catch (err) {
      const error = err.response?.data?.error || err.message;
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchAtd = (e) => {
    const { name, value } = e.target;
    setSearchingAtd(prev => ({ ...prev, [name]: value }));
  };

  const showPastAttendance = async () => {
    try {
      setPastAttendance(null);
      setLoading(true);
      const searchClass = `${stdRoman[searchingAtd.std]} STD ${searchingAtd.section} Attendance`;
      const searchDate = searchingAtd.date.split("-").reverse();
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/staff/get-attendance?std=${searchClass}&date=${searchDate[0]}-${getMonth(searchDate[1])}-${searchDate[2]}`);
      setPastAttendance(res.data.attendance);
    } catch (err) {
      const error = err.response?.data?.error || err.message;
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyPastAttendance = () => {
    setCopy(true);
    setTimeout(() => { setCopy(false) }, 2500);
    const absenteesList = pastAttendance?.absentees.map((name, i) => `  ${i + 1}. ${name}`).join("\n  ");
    navigator.clipboard.writeText(`
*${pastAttendance?.std}*
*------------------------*
  *Date              :* ${pastAttendance?.details.date}
  *Day               :* ${pastAttendance?.details?.day}
  *Subject          :* ${pastAttendance?.details.subject} 
  *No:on:roll      :* ${pastAttendance?.details.no_on_roll}
  *No:of:present :* ${pastAttendance?.details.no_of_present}
  *No:of:absent  :* ${pastAttendance?.details.no_of_absent}

*Absentees*
  ${absenteesList} ${!absenteesList ? "NILL" : ""}
    `);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Calendar className="text-emerald-600" />
          <span className="text-2xl font-semibold">
            <span className="hidden sm:inline-block">Attendance for&nbsp;</span>
            <span className="font-bold text-sky-900 border border-gray-300 bg-sky-100 px-2 rounded-md">
              {today}
            </span>
          </span>
        </div>

        <button
          className="bg-emerald-200 py-1.5 px-2 rounded-lg hover:shadow-md border border-gray-300 text-xs sm:text-sm font-semibold text-emerald-900 cursor-pointer"
          title="View Past Attendance"
          onClick={() => setShowPastAtd(true)}
        >
          Past Attendance
        </button>
      </div>

      {/* Attendance */}
      {showAttendance && (
        <div className="fixed flex flex-col z-10 p-4 justify-center items-center min-h-svh inset-0 bg-black/30">
          <div className="w-full max-w-2xl">
            <div
              className="w-fit ms-auto cursor-pointer bg-sky-50 p-1 rounded-lg transition-all duration-200 mb-2"
              role="button"
              onClick={() => setShowAttendance(false)}
            >
              <X className="text-black size-5" />
            </div>
            <div className="flex max-h-[80vh] scrollbar-hide overflow-auto flex-col items-center bg-white p-5 border border-gray-400 shadow rounded-2xl gap-3 w-full md:w-2xl">
              <div className="flex gap-4 items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <Calendar className="text-emerald-500 size-8" />
                  <h2 className="text-xl font-semibold">Attendance</h2>
                </div>
                <span className="font-bold text-emerald-900 border border-gray-300 bg-emerald-100 text-2xl px-2 rounded-md">{today}</span>
              </div>
              <div className="flex flex-col overflow-auto scrollbar-hide gap-5 bg-sky-100 p-5 rounded-lg border border-gray-200 shadow w-full">
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
                      {finalAttendance.absentees.length === 0 && <span>NILL</span>}
                    </ol>
                  </div>
                </div>
              </div>
              <div className="flex justify-between w-full gap-2">
                <Button
                  variant="success"
                  size="sm"
                  className="w-2/6 flex gap-1 items-center"
                  disabled={loading}
                  onClick={() => setShowAlert(true)}
                >
                  <Save className="size-5" /> Save
                </Button>
                <Button
                  variant="contained"
                  size="sm"
                  className="flex gap-1 items-center"
                  onClick={handleCopy}
                  disabled={copy}
                ><Copy size={17} /> {copy ? "Copied" : "Copy"}</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Past Attendance */}
      {showPastAtd && (
        <div className="fixed flex flex-col z-10 p-4 justify-center items-center min-h-svh inset-0 bg-black/30">
          <div className="w-full max-w-2xl">
            <div
              className="w-fit ms-auto cursor-pointer bg-sky-50 p-1 rounded-lg transition-all duration-200 mb-2"
              role="button"
              onClick={() => {
                setShowPastAtd(false);
                setPastAttendance(null);
              }}
            >
              <X className="text-black size-5" />
            </div>
            <div className="flex max-h-[80vh] scrollbar-hide overflow-auto flex-col items-center bg-white p-5 border border-gray-400 shadow rounded-2xl gap-3 w-full md:w-2xl">
              <div className="flex flex-col gap-2.5 w-full">
                <div className="flex gap-2.5">
                  <div className="flex flex-col w-full">
                    <label htmlFor="std" className="font-bold ms-2">Standard</label>
                    <select id="std" name="std" className="border p-2 rounded-lg border-gray-300"
                      onChange={handleSearchAtd}
                    >
                      <option value="9">9th</option>
                      <option value="10">10th</option>
                      <option value="11">11th</option>
                      <option value="12">12th</option>
                    </select>
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="section" className="font-bold ms-2">Section</label>
                    <select id="section" name="section" className="border p-2 rounded-lg border-gray-300"
                      onChange={handleSearchAtd}
                    >
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                    </select>
                  </div>
                </div>
                <div className="w-full">
                  <label htmlFor="date" className="font-bold ms-2">Date</label>
                  <input type="date" id="date" name="date" className="border w-full p-2 rounded-lg border-gray-300"
                    onChange={handleSearchAtd}
                  />
                </div>
                <hr className="my-5 mx-3 text-gray-300" />
                <Button
                  variant="success"
                  size="sm"
                  onClick={showPastAttendance}
                  disabled={loading}
                >
                  Search
                </Button>
              </div>
              {loading && <Loader className="animate-spin my-4 size-10 text-sky-700" />}
              {pastAttendance && <div className="p-3 bg-sky-100 rounded-lg w-full flex flex-col gap-3">
                <h2 className="text-2xl font-bold">{pastAttendance?.std}</h2>
                <div className="font-semibold text-lg">
                  <p><span className="font-bold">Date :</span> {pastAttendance?.details?.date}</p>
                  <p><span className="font-bold">Day :</span> {pastAttendance?.details?.day}</p>
                  <p><span className="font-bold">Subject :</span> {pastAttendance?.details?.subject}</p>
                  <p><span className="font-bold">No:on:roll :</span> {pastAttendance?.details?.no_on_roll}</p>
                  <p><span className="font-bold">No:of:present :</span> {pastAttendance?.details?.no_of_present}</p>
                  <p><span className="font-bold">No:of:absent :</span> {pastAttendance?.details?.no_of_absent}</p>
                </div>
                <div>
                  <p className="text-xl font-bold">Absentees</p>
                  <ol className="ps-7 list-decimal">
                    {pastAttendance?.absentees.map(absent => (
                      <li key={absent}>{absent}</li>
                    ))}
                  </ol>
                </div>
                <Button
                  variant="contained"
                  size="xs"
                  className="ms-auto"
                  onClick={handleCopyPastAttendance}
                  disabled={copy}
                ><Copy size={16} className="me-1" />
                  {copy ? "Copied" : "Copy"}
                </Button>
              </div>}
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
          className="
            flex-1 max-w-xl border p-2 font-semibold border-gray-300 rounded-md 
            focus:ring-sky-600 focus:ring-3 focus:ring-offset-3 focus:outline
          "
          ref={(el) => selectedSubject.current = el}
        >
          <option value="">Select Today's Subject</option>
          <option value="Tamil">Tamil</option>
          <option value="English">English</option>
          <option value="Maths">Maths</option>
          <option value="Science">Science</option>
          <option value="Social Science">Social Science</option>
        </select>
        <Button
          variant={students.length === attendance.present ? "success" : "contained"}
          size="sm"
          onClick={markAllPresent}
        >
          {students.length === attendance.present ? "All Present" : "Mark All Present"}
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
      {!loading && students.length === 0 && (
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
            <span className="text-3xl font-bold">{attendance.present}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-semibold">No:of:absent</span>
            <span className="text-3xl font-bold">{attendance.absent}</span>
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
      {showAlert && <Alert
        title="Attendance Save"
        msg="Make sure all the details are correct, once the attandance is saved it can't be modify later"
        onProceed={() => {
          handleSave();
          setShowAlert(false);
        }}
        onCancel={() => {
          setShowAlert(false);
          setShowAttendance(false);
        }}
        btn="Proceed"
        cancel={false}
      />}
    </div>
  );
}

export default Attendance;
