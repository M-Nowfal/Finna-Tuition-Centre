import { ChevronDown, ChevronUp } from "lucide-react";
import Button from "../components/ui/Button";

const StdandSecLayout = ({ 
  selectedStd, setSelectedStd,
  selectedSection, setSelectedSection,
  showSections, setShowSections, attendancePage = false
}) => {
  return (
    <div>
      <div className="flex relative max-w-2xl m-auto bg-gray-100 gap-3 p-1 rounded-lg mb-3">
        {[9, 10, 11, 12].map(std => (
          <Button
            key={std}
            variant={selectedStd === std ? "contained" : "secondary"}
            className="flex-1 text-gray-400"
            onClick={() => setSelectedStd(std)}
          >
            <div className="flex items-center gap-1.5">
              <div>
                {std}<sup>th</sup>
              </div>
              {(selectedStd === std && selectedSection !== "All") && <span>{selectedSection}</span>}
              {(selectedStd === std && showSections) ? (
                <ChevronUp
                  className="size-5 hover:bg-sky-500 h-full rounded"
                  onClick={() => setShowSections(false)}
                />
              ) : (
                selectedStd === std && <ChevronDown
                  className="size-5 hover:bg-sky-500 h-full rounded"
                  onClick={() => setShowSections(true)}
                />
              )}
            </div>
          </Button>
        ))}
      </div>
      {showSections && <div className="absolute inset-0" role="button" onClick={() => setShowSections(false)}></div>}
      {showSections && <div className="relative w-80 flex m-auto mb-3 gap-1 bg-gray-100 text-white p-1 rounded-md shadow-lg">
        {["All", "A", "B", "C"].map((section, idx) => (
          <Button
            key={section}
            variant={selectedSection === section ? "contained" : "secondary"}
            className="flex-1"
            onClick={() => {
              setSelectedSection(section);
              setShowSections(false);
            }}
            disabled={attendancePage && idx === 0}
          >
            {section}
          </Button>
        ))}
      </div>}
    </div>
  );
}

export default StdandSecLayout;