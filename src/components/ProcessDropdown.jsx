import { FileText } from "lucide-react";
import PROCESS_SCHEMAS from "../utils/Schema";

const ProcessDropdown = ({
  selectedProcess,
  onProcessChange,
  mode,
  disabled = false,
}) => {
  return (
    <div className="bg-white max-w-2xl mx-auto p-6 rounded-lg shadow-sm my-10">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <FileText className="w-5 h-5 mr-2" />
        Select Process
      </h2>
      <select
        value={selectedProcess}
        onChange={(e) => onProcessChange(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        disabled={disabled || (mode === "user" && !selectedProcess)}
      >
        <option value="">Choose a process...</option>
        {Object.entries(PROCESS_SCHEMAS).map(([key, schema]) => (
          <option key={schema.name} value={key}>
            {schema.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProcessDropdown;
