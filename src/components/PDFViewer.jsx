import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Upload } from "lucide-react";

const PDFViewer = ({
  pdfFile,
  setPdfFile,
  viewPdf,
  setViewPdf,
  pdfContainerRef,
}) => {
  const fileType = ["application/pdf"];
  const newplugin = defaultLayoutPlugin();

  const handleChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = (e) => {
          setPdfFile(e.target.result);
        };
      } else {
        setPdfFile(null);
      }
    } else {
      console.log("Please select");
    }
  };

  const handleSubmit = () => {
    if (pdfFile !== null) {
      setViewPdf(pdfFile);
    } else {
      setViewPdf(null);
    }
  };

  return (
    <div className="w-full">
      {/* File Upload Controls */}
      <div className="w-10/12 mx-auto flex gap-x-5 justify-center items-center my-5">
        <input
          type="file"
          onChange={handleChange}
          className="border border-gray-600 rounded-lg p-3 w-1/2"
          accept=".pdf"
        />
        <button
          onClick={handleSubmit}
          className="bg-green-400 max-w-sm text-white py-3 px-6 rounded-xl my-2 font-semibold flex items-center space-x-2"
        >
          <Upload className="w-4 h-4" />
          <span>View PDF</span>
        </button>
      </div>

      {/* PDF Viewer Container */}
      <div
        ref={pdfContainerRef}
        className="w-full mx-auto h-[400px] flex justify-center items-center overflow-y-auto my-5"
      >
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          {viewPdf ? (
            <Viewer fileUrl={viewPdf} plugins={[newplugin]} />
          ) : (
            <div className="text-gray-500 text-center">
              <Upload className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No PDF loaded</p>
            </div>
          )}
        </Worker>
      </div>
    </div>
  );
};

export default PDFViewer;
