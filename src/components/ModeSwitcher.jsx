import { Settings, User } from "lucide-react";

const ModeSwitcher = ({ mode, onModeChange }) => {
  return (
    <div className="">
      <div className="max-w-7xl mx-auto px-4 py-6 md:flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#e1e1e1] text-center md:text-left">
          PDF Annotation System
        </h1>
        {/* <div className="flex space-x-2">
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
        </div> */}
        <div className="flex justify-center mt-2 md:mt-0 space-x-3">
          <button
            onClick={() => onModeChange("admin")}
            className={`
      relative px-5 py-2.5 rounded-xl flex items-center space-x-2 font-medium transition-all duration-300
      bg-white/10 backdrop-blur-md border border-white/20 shadow-md shadow-black/30
      hover:bg-white/20 hover:shadow-lg
      overflow-hidden
      ${
        mode === "admin"
          ? "ring-1 ring-blue-600/60 text-blue-300"
          : "text-gray-200"
      }
    `}
          >
            <span className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-20 pointer-events-none" />
            <Settings className="w-4 h-4" />
            <span>Admin</span>
          </button>

          <button
            onClick={() => onModeChange("user")}
            className={`
      relative px-5 py-2.5 rounded-xl flex items-center space-x-2 font-medium transition-all duration-300
      bg-white/10 backdrop-blur-md border border-white/20 shadow-md shadow-black/30
      hover:bg-white/20 hover:shadow-lg
      overflow-hidden
      ${
        mode === "user"
          ? "ring-1 ring-green-400/60 text-green-300"
          : "text-gray-200"
      }
    `}
          >
            <span className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-20 pointer-events-none" />
            <User className="w-4 h-4" />
            <span>User</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModeSwitcher;
