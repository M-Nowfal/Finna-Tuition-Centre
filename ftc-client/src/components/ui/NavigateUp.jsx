import { ArrowUp } from "lucide-react";

const NavigateUp = () => {
  return (
    <button
      className={`
        fixed z-5 bg-sky-600 p-2 md:p-3 rounded-full bottom-10 right-7 cursor-pointer
        border border-gray-300 shadow-md hover:bg-sky-700
      `}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUp className="text-white" />
    </button>
  );
}

export default NavigateUp;