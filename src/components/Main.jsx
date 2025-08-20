import { useState, useRef } from "react";
import PROCESS_SCHEMAS from "../utils/Schema";
import ModeSwitcher from "./ModeSwitcher";
import ProcessDropdown from "./ProcessDropdown";
import PDFViewer from "./PDFViewer";
import DynamicForm from "./DynamicForm";
import { useAnnotationLogic } from "../hooks/useAnnotationLogic";

export const Main = () => {
  // Core state management
  const [pdfFile, setPdfFile] = useState(null);
  const [viewPdf, setViewPdf] = useState(null);
  const [mode, setMode] = useState("admin");
  const [selectedProcess, setSelectedProcess] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [formData, setFormData] = useState({});
  const [highlightedField, setHighlightedField] = useState("");

  console.log(formData);
  // Refs
  const pdfContainerRef = useRef(null);

  // Custom hook for annotation logic
  const { annotations, removeAnnotation, clearAllAnnotations } =
    useAnnotationLogic(viewPdf, selectedField, highlightedField, mode);

  // Event handlers
  const handleModeChange = (newMode) => {
    setMode(newMode);
    if (newMode === "user") {
      setSelectedField("");
    }
  };

  const handleProcessChange = (processKey) => {
    setSelectedProcess(processKey);
    setFormData({});
    clearAllAnnotations();
    setSelectedField("");
    setHighlightedField("");
  };

  const handleFieldMapping = (fieldName) => {
    if (selectedField === fieldName) {
      setSelectedField("");
    } else {
      setSelectedField(fieldName);
      setHighlightedField("");
    }
  };

  const handleFieldClick = (fieldName) => {
    if (mode === "user") {
      setHighlightedField((prev) => (prev === fieldName ? "" : fieldName));
    }
  };

  const handleRemoveAnnotation = (fieldName) => {
    removeAnnotation(fieldName);
    if (selectedField === fieldName) {
      setSelectedField("");
    }
  };

  // Derived data
  const currentSchema = selectedProcess
    ? PROCESS_SCHEMAS[selectedProcess]
    : null;

  return (
    <div className="max-w-screen-2xl mx-auto ">
      <ModeSwitcher mode={mode} onModeChange={handleModeChange} />

      <div className="w-10/12 mx-auto">
        <ProcessDropdown
          selectedProcess={selectedProcess}
          onProcessChange={handleProcessChange}
          mode={mode}
        />

        <PDFViewer
          pdfFile={pdfFile}
          setPdfFile={setPdfFile}
          viewPdf={viewPdf}
          setViewPdf={setViewPdf}
          pdfContainerRef={pdfContainerRef}
        />

        {currentSchema && (
          <DynamicForm
            currentSchema={currentSchema}
            mode={mode}
            pdfFile={pdfFile}
            annotations={annotations}
            selectedField={selectedField}
            highlightedField={highlightedField}
            onFieldMapping={handleFieldMapping}
            onRemoveAnnotation={handleRemoveAnnotation}
            onFieldClick={handleFieldClick}
          />
        )}
      </div>
    </div>
  );
};

export default Main;
