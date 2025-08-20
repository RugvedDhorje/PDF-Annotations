import { FileText } from "lucide-react";
import PROCESS_SCHEMAS from "../utils/Schema";

const ProcessDropdown = ({
  selectedProcess,
  onProcessChange,
  mode,
  disabled = false,
}) => {
  return (
    <div className=" max-w-2xl mx-auto p-2 md:p-6 rounded-lg my-10 ">
      <h2 className="text-lg font-semibold mb-4 flex items-center text-[#e1e1e1]">
        <FileText className="w-5 h-5 mr-2" />
        Select Process
      </h2>
      <select
        value={selectedProcess}
        onChange={(e) => onProcessChange(e.target.value)}
        className="
    w-full p-3 rounded-lg
    border border-white/20
    bg-white/10 backdrop-blur-md
    text-white placeholder-gray-300
    focus:ring-2 focus:ring-gray-600 focus:border-transparent
    shadow-lg shadow-black/30
  "
        disabled={disabled || (mode === "user" && !selectedProcess)}
      >
        <option value="" className="bg-gray-900 text-gray-300">
          Choose a process...
        </option>
        {Object.entries(PROCESS_SCHEMAS).map(([key, schema]) => (
          <option
            key={schema.name}
            value={key}
            className="bg-gray-900 text-gray-100"
          >
            {schema.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProcessDropdown;
