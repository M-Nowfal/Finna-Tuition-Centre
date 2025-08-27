import { Calendar, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../../components/ui/Button";
import { toast } from "sonner";
import axios from "axios";

const Attendance = () => {

  const date = new Date();
  const [selectedStd, setSelectedStd] = useState(9);
  const [selectedSection, setSelectedSection] = useState("All");
  const [showSections, setShowSections] = useState();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
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
    })();
  }, [selectedStd, selectedSection]);

  return (
    <div className="flex flex-col gap-3 p-5">
      <div className="flex gap-2 items-center">
        <Calendar className="text-emerald-600" />
        <span className="text-2xl font-semibold">
          Attendance for&nbsp;
          <span className="font-bold text-sky-900 border border-gray-300 bg-sky-100 px-2 rounded-md">
            {date.getDate().toString().padStart(2, "0")}-{(date.getMonth() + 1).toString().padStart(2, "0")}-{date.getFullYear()}
          </span>
        </span>
      </div>
      <div className="mt-4">
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
      </div>

      <div className="flex justify-center items-center">
        {!loading ? (<div className="grid sm:grid-cols-2 gap-3">
          {students.map(student => (
            <div key={student._id} className="flex justify-between items-center gap-5 p-3 border border-gray-400 rounded-md shadow-md hover:shadow-xl">
              <div className="font-semibold">
                <p>{student.name}</p>
                <span className="font-bold text-emerald-700">{student.roll_no || "Not Given"}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="contained" size="xs">Present</Button>
                <Button variant="danger-outlined" size="xs">Absent</Button>
              </div>
            </div>
          ))}
        </div>) : (
          <div className="flex items-center justify-center min-h-[50vh]">
            <Loader2 className="animate-spin size-15 text-sky-500" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Attendance;
