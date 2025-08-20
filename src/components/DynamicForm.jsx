import { Square } from "lucide-react";

const DynamicForm = ({
  currentSchema,
  mode,
  pdfFile,
  annotations,
  selectedField,
  highlightedField,
  onFieldMapping,
  onRemoveAnnotation,
  onFieldClick,
}) => {
  if (!currentSchema) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">
        {currentSchema.name} Fields
      </h2>
      <div className="space-y-4">
        {currentSchema.fields.map((field) => {
          const annotation = annotations.find(
            (ann) => ann.fieldName === field.name
          );

          return (
            <FieldItem
              key={field.name}
              field={field}
              annotation={annotation}
              mode={mode}
              pdfFile={pdfFile}
              selectedField={selectedField}
              highlightedField={highlightedField}
              onFieldMapping={onFieldMapping}
              onRemoveAnnotation={onRemoveAnnotation}
              onFieldClick={onFieldClick}
            />
          );
        })}
      </div>
    </div>
  );
};

const FieldItem = ({
  field,
  annotation,
  mode,
  pdfFile,
  selectedField,
  highlightedField,
  onFieldMapping,
  onRemoveAnnotation,
  onFieldClick,
}) => {
  const getFieldClasses = () => {
    if (mode === "user") return "cursor-pointer";
    return "";
  };

  const getBorderClasses = () => {
    if (highlightedField === field.name) {
      return "border-blue-500 bg-blue-50";
    }
    if (selectedField === field.name) {
      return "border-orange-500 bg-orange-50";
    }
    if (annotation) {
      return "border-green-500 bg-green-50";
    }
    return "border-gray-300";
  };

  return (
    <div
      className={`p-3 border rounded-lg transition-colors ${getFieldClasses()} ${getBorderClasses()}`}
      onClick={() => (mode === "user" ? onFieldClick(field.name) : undefined)}
    >
      <div className="flex justify-between items-start mb-2">
        <label className="block text-sm font-medium text-gray-700">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>

        {mode === "admin" && pdfFile && (
          <AdminControls
            fieldName={field.name}
            selectedField={selectedField}
            onFieldMapping={onFieldMapping}
            onRemoveAnnotation={onRemoveAnnotation}
          />
        )}
      </div>

      {/* Show coordinates when annotation exists */}
      {annotation && <AnnotationInfo annotation={annotation} />}

      {/* Show mapping status */}
      {selectedField === field.name && <MappingStatus />}
    </div>
  );
};

const AdminControls = ({
  fieldName,
  selectedField,
  onFieldMapping,
  onRemoveAnnotation,
}) => (
  <div className="flex space-x-1">
    <button
      onClick={(e) => {
        e.stopPropagation();
        onFieldMapping(fieldName);
      }}
      className={`px-3 py-1 text-xs rounded flex items-center space-x-1 ${
        selectedField === fieldName
          ? "bg-orange-600 text-white"
          : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
      title={
        selectedField === fieldName
          ? "Drawing mode active"
          : "Click to map this field"
      }
    >
      <span>Map</span>
    </button>
    <button
      onClick={(e) => {
        e.stopPropagation();
        onRemoveAnnotation(fieldName);
      }}
      className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 flex items-center space-x-1"
      title="Remove mapping"
    >
      <span>Remap</span>
    </button>
  </div>
);

const AnnotationInfo = ({ annotation }) => (
  <div className="mb-3 p-2 bg-gray-100 rounded text-xs font-mono">
    <div className="text-green-700 font-semibold mb-1">
      {/* 📍 Mapped Coordinates: */}
    </div>
    <div>
      X: {annotation.x.toFixed(2)}%, Y: {annotation.y.toFixed(2)}%
    </div>
    <div>
      W: {annotation.width.toFixed(2)}%, H: {annotation.height.toFixed(2)}%
    </div>
  </div>
);

const MappingStatus = () => (
  <div className="mb-2 text-xs text-orange-700 bg-orange-100 p-2 rounded flex items-center">
    <Square className="w-3 h-3 mr-1" />
    Click and drag on PDF to create annotation
  </div>
);

export default DynamicForm;
