// Mock process schemas
const PROCESS_SCHEMAS = {
  "loan-application": {
    name: "Loan Application",
    fields: [
      {
        name: "applicant_name",
        label: "Applicant Name",
        type: "text",
        required: true,
      },
      {
        name: "loan_amount",
        label: "Loan Amount",
        type: "number",
        required: true,
      },
      {
        name: "income",
        label: "Annual Income",
        type: "number",
        required: true,
      },
      {
        name: "employment_type",
        label: "Employment Type",
        type: "select",
        options: ["Full-time", "Part-time", "Self-employed"],
        required: true,
      },
      { name: "phone", label: "Phone Number", type: "tel", required: true },
    ],
  },
  "insurance-claim": {
    name: "Insurance Claim",
    fields: [
      {
        name: "policy_number",
        label: "Policy Number",
        type: "text",
        required: true,
      },
      {
        name: "claim_amount",
        label: "Claim Amount",
        type: "number",
        required: true,
      },
      {
        name: "incident_date",
        label: "Incident Date",
        type: "date",
        required: true,
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        required: true,
      },
      {
        name: "witness_name",
        label: "Witness Name",
        type: "text",
        required: false,
      },
    ],
  },
  "job-application": {
    name: "Job Application",
    fields: [
      { name: "full_name", label: "Full Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      {
        name: "position",
        label: "Position Applied",
        type: "text",
        required: true,
      },
      {
        name: "experience",
        label: "Years of Experience",
        type: "number",
        required: true,
      },
      { name: "skills", label: "Key Skills", type: "textarea", required: true },
    ],
  },
  "expense-report": {
    name: "Expense Report",
    fields: [
      {
        name: "employee_id",
        label: "Employee ID",
        type: "text",
        required: true,
      },
      {
        name: "report_date",
        label: "Report Date",
        type: "date",
        required: true,
      },
      {
        name: "total_amount",
        label: "Total Amount",
        type: "number",
        required: true,
      },
      {
        name: "purpose",
        label: "Business Purpose",
        type: "textarea",
        required: true,
      },
      {
        name: "manager_approval",
        label: "Manager Name",
        type: "text",
        required: true,
      },
    ],
  },
};
export default PROCESS_SCHEMAS;
// import React, { useState } from "react";
// import { Viewer, Worker } from "@react-pdf-viewer/core";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// import {
//   Upload,
//   Save,
//   ZoomIn,
//   ZoomOut,
//   RotateCcw,
//   Eye,
//   Settings,
//   User,
//   FileText,
//   MapPin,
//   Square,
// } from "lucide-react";
// import PROCESS_SCHEMAS from "../utils/Schema";
// export const Home = () => {
//   const [pdfFile, setPdfFile] = useState(null);
//   const [viewPdf, setViewPdf] = useState(null);
//   const [mode, setMode] = useState("admin");
//   const [selectedProcess, setSelectedProcess] = useState("");
//   const [annotations, setAnnotations] = useState([]);
//   const [selectedField, setSelectedField] = useState("");
//   const [formData, setFormData] = useState({});
//   const [highlightedField, setHighlightedField] = useState("");
//   console.log(formData);
//   const fileType = ["application/pdf"];
//   const handleChange = (e) => {
//     let selectedFile = e.target.files[0];
//     if (selectedFile) {
//       if (selectedFile && fileType.includes(selectedFile.type)) {
//         let reader = new FileReader();
//         reader.readAsDataURL(selectedFile);
//         reader.onload = (e) => {
//           setPdfFile(e.target.result);
//         };
//       } else {
//         setPdfFile(null);
//       }
//     } else {
//       console.log("Please select");
//     }
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (pdfFile !== null) {
//       setViewPdf(pdfFile);
//     } else {
//       setViewPdf(null);
//     }
//   };
//   const handleProcessChange = (processKey) => {
//     setSelectedProcess(processKey);
//     setFormData({});
//     setAnnotations([]);
//     setSelectedField("");
//   };
//   const handleFieldMapping = (fieldName) => {
//     if (selectedField === fieldName) {
//       setSelectedField("");
//     } else {
//       setSelectedField(fieldName);
//     }
//   };

//   const newplugin = defaultLayoutPlugin();
//   const currentSchema = selectedProcess
//     ? PROCESS_SCHEMAS[selectedProcess]
//     : null;
//   return (
//     <div className="max-w-screen-2xl ">
//       <div className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-gray-900">
//             PDF Annotation System
//           </h1>
//           <div className="flex space-x-2">
//             <button
//               onClick={() => setMode("admin")}
//               className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
//                 mode === "admin"
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-200 text-gray-700"
//               }`}
//             >
//               <Settings className="w-4 h-4" />
//               <span>Admin</span>
//             </button>
//             <button
//               onClick={() => setMode("user")}
//               className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
//                 mode === "user"
//                   ? "bg-green-600 text-white"
//                   : "bg-gray-200 text-gray-700"
//               }`}
//             >
//               <User className="w-4 h-4" />
//               <span>User</span>
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className="w-10/12">
//         <div className="bg-white p-6 rounded-lg shadow-sm">
//           <h2 className="text-lg font-semibold mb-4 flex items-center">
//             <FileText className="w-5 h-5 mr-2" />
//             Select Process
//           </h2>
//           <select
//             value={selectedProcess}
//             onChange={(e) => handleProcessChange(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             disabled={mode === "user" && !selectedProcess}
//           >
//             <option value="">Choose a process...</option>
//             {Object.entries(PROCESS_SCHEMAS).map(([key, schema]) => (
//               <option key={key} value={key}>
//                 {schema.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <form onSubmit={handleSubmit} className="w-10/12 mx-auto">
//           <input type="file" onChange={handleChange} />
//           <button type="submit" className="bg-green-400 text-white p-3">
//             View Pdf{" "}
//           </button>
//         </form>
//         <h2 className="text-center">View Pdf</h2>
//         <div className="w-10/12 mx-auto h-[600px] flex justify-center items-center overflow-y-auto">
//           <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
//             {viewPdf && (
//               <>
//                 <Viewer fileUrl={viewPdf} plugins={[newplugin]} />
//               </>
//             )}
//             {!viewPdf && <>No Pdf</>}
//           </Worker>
//         </div>
//         {currentSchema && (
//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <h2 className="text-lg font-semibold mb-4">
//               {currentSchema.name} Fields
//             </h2>
//             <div className="space-y-4">
//               {currentSchema.fields.map((field) => {
//                 const annotation = annotations.find(
//                   (ann) => ann.fieldName === field.name
//                 );
//                 return (
//                   <div
//                     key={field.name}
//                     className={`p-3 border rounded-lg transition-colors ${
//                       highlightedField === field.name
//                         ? "border-blue-500 bg-blue-50"
//                         : selectedField === field.name
//                         ? "border-orange-500 bg-orange-50"
//                         : annotation
//                         ? "border-green-500 bg-green-50"
//                         : "border-gray-300"
//                     }`}
//                   >
//                     <div className="flex justify-between items-start mb-2">
//                       <label className="block text-sm font-medium text-gray-700">
//                         {field.label}
//                         {field.required && (
//                           <span className="text-red-500 ml-1">*</span>
//                         )}
//                       </label>
//                       {mode === "admin" && pdfFile && (
//                         <div className="flex space-x-1">
//                           <button
//                             onClick={() => handleFieldMapping(field.name)}
//                             className={`px-3 py-1 text-xs rounded flex items-center space-x-1 ${
//                               selectedField === field.name
//                                 ? "bg-orange-600 text-white"
//                                 : "bg-blue-600 text-white hover:bg-blue-700"
//                             }`}
//                             title={
//                               selectedField === field.name
//                                 ? "Drawing mode active"
//                                 : "Click to map this field"
//                             }
//                           >
//                             <MapPin className="w-3 h-3" />
//                             <span>Map</span>
//                           </button>
//                           <button
//                             onClick={() => {
//                               const filtered = annotations.filter(
//                                 (ann) => ann.fieldName !== field.name
//                               );
//                               setAnnotations(filtered);
//                               if (selectedField === field.name) {
//                                 setSelectedField("");
//                               }
//                             }}
//                             className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 flex items-center space-x-1"
//                             title="Remove mapping"
//                           >
//                             <RotateCcw className="w-3 h-3" />
//                             <span>Remap</span>
//                           </button>
//                         </div>
//                       )}
//                     </div>

//                     {/* Show coordinates when annotation exists */}
//                     {annotation && (
//                       <div className="mb-3 p-2 bg-gray-100 rounded text-xs font-mono">
//                         <div className="text-green-700 font-semibold mb-1">
//                           📍 Mapped Coordinates:
//                         </div>
//                         <div>
//                           X: {Math.round(annotation.x)}, Y:{" "}
//                           {Math.round(annotation.y)}
//                         </div>
//                         <div>
//                           W: {Math.round(annotation.width)}, H:{" "}
//                           {Math.round(annotation.height)}
//                         </div>
//                       </div>
//                     )}

//                     {/* Show mapping status */}
//                     {selectedField === field.name && (
//                       <div className="mb-2 text-xs text-orange-700 bg-orange-100 p-2 rounded flex items-center">
//                         <Square className="w-3 h-3 mr-1" />
//                         Click and drag on PDF to create annotation
//                       </div>
//                     )}

//                     {annotation && selectedField !== field.name && (
//                       <div className="text-xs text-green-700 bg-green-100 p-2 rounded flex items-center">
//                         <Square className="w-3 h-3 mr-1" />
//                         Field successfully mapped
//                         {mode === "user" && (
//                           <button
//                             onClick={() => setHighlightedField(field.name)}
//                             className="ml-2 text-blue-600 underline hover:text-blue-800"
//                           >
//                             Show on PDF
//                           </button>
//                         )}
//                       </div>
//                     )}

//                     {!annotation && selectedField !== field.name && (
//                       <div className="text-xs text-gray-500 bg-gray-100 p-2 rounded flex items-center">
//                         <Square className="w-3 h-3 mr-1" />
//                         {mode === "admin"
//                           ? 'Click "Map" to annotate this field'
//                           : "No mapping available"}
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;
