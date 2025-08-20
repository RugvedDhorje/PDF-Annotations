import { useState, useEffect, useCallback } from "react";

export const useAnnotationLogic = (
  viewPdf,
  selectedField,
  highlightedField,
  mode
) => {
  const [annotations, setAnnotations] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentRect, setCurrentRect] = useState(null);
  const [pdfPages, setPdfPages] = useState([]);

  const getPageCoordinates = useCallback((e, overlay) => {
    const overlayRect = overlay.getBoundingClientRect();
    const x = e.clientX - overlayRect.left;
    const y = e.clientY - overlayRect.top;

    const relativeX = (x / overlayRect.width) * 100;
    const relativeY = (y / overlayRect.height) * 100;

    const pageIndex = parseInt(overlay.getAttribute("data-page-index")) || 0;
    return { x: relativeX, y: relativeY, pageIndex };
  }, []);

  const handleOverlayMouseDown = useCallback(
    (e) => {
      if (!selectedField || mode !== "admin") return;

      console.log("Mouse down on PDF page");
      e.preventDefault();
      e.stopPropagation();

      const overlay = e.currentTarget;
      const pos = getPageCoordinates(e, overlay);
      console.log("Start position:", pos);
      setStartPos(pos);
      setIsDrawing(true);
      setCurrentRect({ ...pos, width: 0, height: 0 });
    },
    [selectedField, mode, getPageCoordinates]
  );

  const handleOverlayMouseMove = useCallback(
    (e) => {
      if (!isDrawing) return;

      e.preventDefault();

      const overlay = e.currentTarget;
      const pos = getPageCoordinates(e, overlay);
      const width = pos.x - startPos.x;
      const height = pos.y - startPos.y;

      const newRect = {
        ...startPos,
        width: Math.abs(width),
        height: Math.abs(height),
        x: width >= 0 ? startPos.x : pos.x,
        y: height >= 0 ? startPos.y : pos.y,
      };

      console.log("Current rect:", newRect);
      setCurrentRect(newRect);
    },
    [isDrawing, getPageCoordinates, startPos]
  );

  const handleOverlayMouseUp = useCallback(
    (e) => {
      if (!isDrawing || !currentRect) return;

      console.log("Mouse up, creating annotation");
      e.preventDefault();
      setIsDrawing(false);

      if (currentRect.width > 1 && currentRect.height > 1) {
        const newAnnotation = {
          fieldName: selectedField,
          x: currentRect.x,
          y: currentRect.y,
          width: currentRect.width,
          height: currentRect.height,
          pageIndex: currentRect.pageIndex,
          timestamp: Date.now(),
        };

        console.log("Created annotation:", newAnnotation);
        setAnnotations((prev) => {
          const filtered = prev.filter(
            (ann) => ann.fieldName !== selectedField
          );
          return [...filtered, newAnnotation];
        });
      }

      setCurrentRect(null);
    },
    [isDrawing, currentRect, selectedField]
  );

  const findAndSetupPdfPages = useCallback(() => {
    // multiple selectors(different pdf versions)
    let pages = document.querySelectorAll('[data-testid="core__page-layer"]');
    if (pages.length === 0) {
      pages = document.querySelectorAll(".rpv-core__page-layer");
    }
    if (pages.length === 0) {
      pages = document.querySelectorAll(".rpv-core__page");
    }
    if (pages.length === 0) {
      pages = document.querySelectorAll("canvas");
    }

    // console.log("Found PDF pages:", pages.length);
    setPdfPages(Array.from(pages));

    // Clean up existing event listeners first
    document.querySelectorAll(".pdf-page-overlay").forEach((overlay) => {
      overlay.remove();
    });

    pages.forEach((page, index) => {
      page.style.position = "relative";

      // Create transparent overlay
      const overlay = document.createElement("div");
      overlay.className = "pdf-page-overlay";
      overlay.style.position = "absolute";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100%";
      overlay.style.height = "100%";
      overlay.style.zIndex = mode === "admin" && selectedField ? "999" : "-1";
      overlay.style.cursor =
        mode === "admin" && selectedField ? "crosshair" : "default";
      overlay.style.pointerEvents =
        mode === "admin" && selectedField ? "auto" : "none";

      overlay.setAttribute("data-page-index", index.toString());

      if (mode === "admin" && selectedField) {
        overlay.addEventListener("mousedown", handleOverlayMouseDown);
        overlay.addEventListener("mousemove", handleOverlayMouseMove);
        overlay.addEventListener("mouseup", handleOverlayMouseUp);
      }

      page.appendChild(overlay);
    });
  }, [
    mode,
    selectedField,
    handleOverlayMouseDown,
    handleOverlayMouseMove,
    handleOverlayMouseUp,
  ]);

  const renderAnnotationsOnPDF = useCallback(() => {
    // Remove existing annotations
    document
      .querySelectorAll(".pdf-custom-annotation")
      .forEach((el) => el.remove());

    console.log(
      "Rendering annotations, total:",
      annotations.length,
      "highlightedField:",
      highlightedField,
      "selectedField:",
      selectedField
    );

    // Add annotations for highlighted field
    annotations.forEach((annotation) => {
      const shouldShow =
        (highlightedField && annotation.fieldName === highlightedField) ||
        (selectedField && annotation.fieldName === selectedField);

      if (!shouldShow) return;

      // Find the target page
      let targetPage = null;

      // find correct page
      let pages = document.querySelectorAll('[data-testid="core__page-layer"]');
      if (pages.length === 0) {
        pages = document.querySelectorAll(".rpv-core__page-layer");
      }
      if (pages.length === 0) {
        pages = document.querySelectorAll(".rpv-core__page");
      }
      if (pages.length === 0) {
        pages = document.querySelectorAll("canvas");
      }

      targetPage = pages[annotation.pageIndex || 0];
      if (!targetPage) {
        console.log("Could not find target page for annotation");
        return;
      }

      console.log("Creating annotation element for", annotation.fieldName);
      //dom element
      const annotationEl = document.createElement("div");
      annotationEl.className = `pdf-custom-annotation absolute border-2 pointer-events-none ${
        highlightedField === annotation.fieldName
          ? "border-blue-500 bg-blue-200 bg-opacity-30"
          : "border-green-500 bg-green-200 bg-opacity-20"
      }`;

      annotationEl.style.left = `${annotation.x}%`;
      annotationEl.style.top = `${annotation.y}%`;
      annotationEl.style.width = `${annotation.width}%`;
      annotationEl.style.height = `${annotation.height}%`;
      annotationEl.style.zIndex = "1000";
      annotationEl.style.position = "absolute";
      //label
      const label = document.createElement("div");
      label.className = `text-xs px-1 ${
        highlightedField === annotation.fieldName
          ? "bg-blue-500 text-white"
          : "bg-green-500 text-white"
      } absolute -top-5 left-0 rounded whitespace-nowrap`;
      label.textContent = annotation.fieldName;

      annotationEl.appendChild(label);

      // Ensure parent has relative positioning
      if (targetPage.style.position !== "relative") {
        targetPage.style.position = "relative";
      }

      targetPage.appendChild(annotationEl);
    });

    // Add current drawing rectangle
    if (currentRect && isDrawing) {
      let pages = document.querySelectorAll('[data-testid="core__page-layer"]');
      if (pages.length === 0) {
        pages = document.querySelectorAll(".rpv-core__page-layer");
      }
      if (pages.length === 0) {
        pages = document.querySelectorAll(".rpv-core__page");
      }
      if (pages.length === 0) {
        pages = document.querySelectorAll("canvas");
      }

      const targetPage = pages[currentRect.pageIndex || 0];
      if (targetPage) {
        console.log("Creating current drawing rectangle");
        const drawingEl = document.createElement("div");
        drawingEl.className =
          "pdf-custom-annotation absolute border-2 border-dashed border-orange-500 bg-orange-200 bg-opacity-30 pointer-events-none";
        drawingEl.style.left = `${currentRect.x}%`;
        drawingEl.style.top = `${currentRect.y}%`;
        drawingEl.style.width = `${currentRect.width}%`;
        drawingEl.style.height = `${currentRect.height}%`;
        drawingEl.style.zIndex = "1000";
        drawingEl.style.position = "absolute";

        if (targetPage.style.position !== "relative") {
          targetPage.style.position = "relative";
        }

        targetPage.appendChild(drawingEl);
      }
    }
  }, [annotations, highlightedField, selectedField, currentRect, isDrawing]);
  //remove ann by field name
  const removeAnnotation = useCallback((fieldName) => {
    setAnnotations((prev) => prev.filter((ann) => ann.fieldName !== fieldName));
  }, []);

  const clearAllAnnotations = useCallback(() => {
    setAnnotations([]);
  }, []);

  // Effect to setup PDF pages and annotations
  useEffect(() => {
    if (!viewPdf) return;

    // Multiple attempts to find PDF pages as they load asynchronously
    const setupAttempts = [500, 1000, 2000, 3000];
    const timeouts = [];

    setupAttempts.forEach((delay) => {
      const timeout = setTimeout(() => {
        console.log(`Attempting to find PDF pages after ${delay}ms`);
        findAndSetupPdfPages();
        renderAnnotationsOnPDF();
      }, delay);
      timeouts.push(timeout);
    });

    const observer = new MutationObserver(() => {
      console.log("PDF DOM changed, updating pages");
      setTimeout(() => {
        findAndSetupPdfPages();
        renderAnnotationsOnPDF();
      }, 100);
    });

    const container = document.querySelector(".w-full.mx-auto.h-\\[400px\\]");
    if (container) {
      observer.observe(container, { childList: true, subtree: true });
    }

    return () => {
      timeouts.forEach(clearTimeout);
      observer.disconnect();
      // Clean up overlays and event listeners
      document.querySelectorAll(".pdf-page-overlay").forEach((overlay) => {
        overlay.removeEventListener("mousedown", handleOverlayMouseDown);
        overlay.removeEventListener("mousemove", handleOverlayMouseMove);
        overlay.removeEventListener("mouseup", handleOverlayMouseUp);
        overlay.remove();
      });
      document
        .querySelectorAll(".pdf-custom-annotation")
        .forEach((el) => el.remove());
    };
  }, [
    viewPdf,
    selectedField,
    highlightedField,
    annotations,
    currentRect,
    mode,
    findAndSetupPdfPages,
    renderAnnotationsOnPDF,
    handleOverlayMouseDown,
    handleOverlayMouseMove,
    handleOverlayMouseUp,
  ]);

  return {
    annotations,
    setAnnotations,
    removeAnnotation,
    clearAllAnnotations,
    pdfPages,
  };
};
