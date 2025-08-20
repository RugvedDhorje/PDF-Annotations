import { Settings, User } from "lucide-react";

const ModeSwitcher = ({ mode, onModeChange }) => {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          PDF Annotation System
        </h1>
        <div className="flex space-x-2">
          <button
            onClick={() => onModeChange("admin")}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              mode === "admin"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Admin</span>
          </button>
          <button
            onClick={() => onModeChange("user")}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              mode === "user"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            <User className="w-4 h-4" />
            <span>User</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModeSwitcher;
