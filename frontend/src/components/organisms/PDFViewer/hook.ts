import { useCallback, useEffect, useRef, useState } from "react";
import { DEFAULT_ZOOM, MIN_ZOOM, MAX_ZOOM, PDF_STYLE, WEBVIEWER_CONFIG } from "../../../constants";
import WebViewer from "@pdftron/pdfjs-express-viewer";
import { getFileById } from "../../../services/FileService";
import { useNavigate } from "react-router-dom";

export const usePdfViewerHooks = (fileDocument: string, fileId: number, searchQuery?: string | null) => {
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchResults, setSearchResults] = useState([]);
  const [fileName, setFileName] = useState("");
  const [currentZoomLevel, setCurrentZoomLevel] =
    useState<number>(DEFAULT_ZOOM);
  const [docViewerState, setDocViewerState] = useState<any>({
    getZoomLevel: () => DEFAULT_ZOOM,
    getPageCount: () => 1,
    getCurrentPage: () => 1,
    zoomTo: () => Object,
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    setCurrentPage: (pageNum: number) => Object,
  });

  const navigate = useNavigate();

  useEffect(() => {
    getFileById(fileId)
      .then((response) => {
        const blob = new Blob([response.file], { type: "application/pdf" });
        console.log(URL.createObjectURL(blob));
        setFileName(response.name);
        return blob;
      })
      .then((blob: any) => {
        const webViewerElement = viewerRef.current;
        const webViewerIframe = document.querySelector(
          "iframe[title='webviewer']"
        ) as HTMLIFrameElement;

        webViewerIframe === null &&
          WebViewer({ ...WEBVIEWER_CONFIG }, webViewerElement).then(
            (instance: any) => {
              const { documentViewer } = instance.Core;
              instance.UI.loadDocument(blob, { filename: "myfile.pdf" });
              const iframeDoc = instance.UI.iframeWindow.document;
              instance.UI.openElements(["thumbnailsPanel"]);

              const searchListener = function (
                searchValue: any,
                options: any,
                results: any
              ) {
                const pagedSearchResults = results.map(
                  (element: { OG: any; DH: any }) => {
                    return [element.OG, element.DH];
                  }
                );
                setSearchResults(pagedSearchResults);
              };

              searchQuery &&
                documentViewer.setSearchHighlightColors({
                  searchResult: "rgba(255,215,73,0.25)",
                  activeSearchResult: "rgba(255,215,73,0.25)",
                });

              documentViewer.addEventListener(
                "pageNumberUpdated",
                (pageNumber: number) => {
                  setCurrentPage(pageNumber);
                }
              );

              documentViewer.addEventListener("documentLoaded", async () => {
                setDocViewerState(documentViewer);
                setCurrentZoomLevel(DEFAULT_ZOOM);
                if (searchQuery) {
                  const searchPattern = `[A-z][^.!?]*\\b${searchQuery}\\b[^.!?]*\\.`;
                  instance.UI.addSearchListener(searchListener);

                  instance.UI.searchTextFull(searchPattern, {
                    regex: true,
                    wholeWord: true,
                  });
                }
              });

              const iframeStyle = document.createElement("style");
              iframeStyle.innerHTML = PDF_STYLE;
              iframeDoc.head.appendChild(iframeStyle);
            }
          );
      });
  }, []);

  const handleNavigateBack = useCallback(() => {
    navigate("/home")
  }, []);

  const handleZoom = useCallback(
    (newZoomLevel: number) => {
      newZoomLevel = Math.min(Math.max(newZoomLevel, MIN_ZOOM), MAX_ZOOM);
      setCurrentZoomLevel(newZoomLevel);
      docViewerState.zoomTo(newZoomLevel);
    },
    [docViewerState, setCurrentZoomLevel, MIN_ZOOM, MAX_ZOOM]
  );

  const handleZoomOut = useCallback(() => {
    handleZoom(currentZoomLevel - 0.1);
  }, [currentZoomLevel, handleZoom]);

  const handleZoomIn = useCallback(() => {
    handleZoom(currentZoomLevel + 0.1);
  }, [currentZoomLevel, handleZoom]);

  const handleNavigateSearch = (pageNumber: number) => {
    if (searchResults.length) {
      setCurrentPage(pageNumber);
      docViewerState.setCurrentPage(pageNumber);
    }
  };

  return {
    viewerRef,
    currentPage,
    docViewerState,
    currentZoomLevel,
    handleZoomOut,
    handleZoomIn,
    handleNavigateBack,
    searchResults,
    handleNavigateSearch,
    fileName
  };
};
