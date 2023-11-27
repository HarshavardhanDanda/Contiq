import { Box, styled, useTheme } from "@mui/material";
import TypographyComponent from "../../atoms/Typography";
import { IconComponent } from "../../atoms/Icon";
import { PaginationBar } from "../../molecules/Pagination";
import BackIcon from "../../../../public/assets/images/blackLeftArrow.svg";
import { usePdfViewerHooks } from "./hook";
import SearchPanel from "../SearchPanel";
import samplePdf from "../../../../public/assets/files/sample.pdf";
import { useParams } from "react-router-dom";

export interface PdfViewerProps {
  searchQuery?: string;
}

const RootBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

const TopBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  padding: `${theme.spacing(7)} ${theme.spacing(6)}`,
}));

const HeadBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
  cursor: "pointer",
}));

const WebViewerBox = styled(Box)({
  height: "85vh",
});

const PaginationBox = styled(Box)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(5),
  zIndex: 25,
  left: "50%",
  transform: "translateX(-50%)",
}));

const PdfViewer = () => {
  const fileDocument = samplePdf;
  const { fileId } = useParams<{ fileId: string }>();
  const queryParams = new URLSearchParams(window.location.search);
  const searchQuery = queryParams.get("q");

  const {
    viewerRef,
    currentPage,
    docViewerState,
    currentZoomLevel,
    handleZoomOut,
    handleZoomIn,
    handleNavigateBack,
    searchResults,
    handleNavigateSearch,
    fileName,
  } = usePdfViewerHooks(fileDocument, parseInt(fileId as string, 10), searchQuery);

  const theme = useTheme();

  const getFileNameWithoutExtension = (fileName: string): string => {
    const index = fileName.lastIndexOf(".");
    return index !== -1 ? fileName.substring(0, index) : fileName;
  };

  return (
    <RootBox>
      <TopBox>
        <HeadBox onClick={handleNavigateBack}>
          <IconComponent src={BackIcon} alt="back" />
          <TypographyComponent
            variant="h2"
            color={theme.palette.textColor.black}
          >
            {fileName}
          </TypographyComponent>
        </HeadBox>
        {searchQuery && (
          <Box sx={{ position: "absolute", right: theme.spacing(6) }}>
            <SearchPanel
              searchQuery={searchQuery}
              docName={getFileNameWithoutExtension(fileName)}
              searchResults={searchResults}
              currentPage={currentPage}
              totalPages={docViewerState.getPageCount()}
              handleNavigateSearch={handleNavigateSearch}
            />
          </Box>
        )}
      </TopBox>
      <Box>
        <WebViewerBox ref={viewerRef}></WebViewerBox>
      </Box>
      <PaginationBox>
        <PaginationBar
          pageNumber={currentPage}
          totalPages={docViewerState.getPageCount()}
          zoomPercent={Math.round(currentZoomLevel * 100)}
          handleZoomOut={handleZoomOut}
          handleZoomIn={handleZoomIn}
        />
      </PaginationBox>
    </RootBox>
  );
};

export default PdfViewer;
