import { Box, Button, Stack } from "@mui/material";
import { useState } from "react";
import FilterBar from "../../components/organisms/FilterBar ";
import NavBar from "../../components/organisms/NavBar";
import HomeTemplate from "../../components/templates/HomeTemplate";
import TypographyComponent from "../../components/atoms/Typography";
import theme from "../../theme/theme";
import Tabs from "../../components/molecules/Tabs";
import addIcon from "../../../public/assets/images/plus.svg";
import { IconComponent } from "../../components/atoms/Icon";
import UploadFiles from "../../components/organisms/UploadFiles";
import FileCard from "../../components/molecules/FileCard";
import pdfIcon from "../../../public/assets/images/icon-pdf.svg";
import { useFilesData } from "./hooks";
import { SCROLLBAR_STYLE_2, fileImaesArray } from "../../constants";
import { useNavigate } from "react-router";

export interface PDFFileType {
  id: number;
  name: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  uploadedBy: number;
}

export const FilesPage = () => {
  const {
    startDateLabel,
    setStartDateLabel,
    endDateLabel,
    setEndDateLabel,
    fileType,
    publishedType,
    selectedStartDate,
    selectedEndDate,
    filteredFiles,
    handleFileChange,
    handlePublishedChange,
    setFileType,
    setPublishedType,
  } = useFilesData();

  const navigate = useNavigate();

  const [isUploadFilesOpen, setIsUploadFilesOpen] = useState(false);

  const handleOpenUploadFilesModal = () => {
    setIsUploadFilesOpen(true);
  };

  const handleCloseUploadFilesModal = () => {
    setIsUploadFilesOpen(false);
    window.location.reload();
  };

  const handlePublishedTypeClear = () => {
    setPublishedType("");
  };
  const handleFileTypeClear = () => {
    setFileType("");
  };

  const renderFileCards = () => {
    return filteredFiles.map((file: PDFFileType, index) => {
      const handleDoubleClick = (id: number) => {
        navigate(`/pdf/${id}`);
      };
      return (
        <FileCard
          key={file.id}
          image={{
            src: fileImaesArray[index % 3],
            alt: file.name,
          }}
          textIcon={{
            src: pdfIcon,
            alt: "PDF Icon",
          }}
          text={{
            variant: "body1",
            children: file.name,
          }}
          fileType={file.type}
          created_at={file.createdAt}
          updated_at={file.updatedAt}
          onDoubleClick={() => handleDoubleClick(file.id)}
        />
      );
    });
  };

  return (
    <HomeTemplate
      sidebar={<NavBar activeItem="Files" />}
      content={
        <Box>
          <Stack
            sx={{ padding: "30px 24px" }}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <TypographyComponent
              variant="h2"
              color={theme.palette.textColor.black}
            >
              {"Files"}
            </TypographyComponent>

            <Button
              sx={{ width: "108px", padding: "6px 8px" }}
              startIcon={<IconComponent src={addIcon} alt={"add-icon"} />}
              variant="contained"
              onClick={() => handleOpenUploadFilesModal()}
            >
              <TypographyComponent
                variant="body1"
                color={theme.palette.textColor.white}
              >
                {"Add files"}
              </TypographyComponent>
            </Button>
            {isUploadFilesOpen && (
              <UploadFiles
                data-testid="close-open"
                isOpen={isUploadFilesOpen}
                onClose={handleCloseUploadFilesModal}
              />
            )}
          </Stack>
          <FilterBar
            startDate={startDateLabel}
            endDate={endDateLabel}
            setStartDate={setStartDateLabel}
            setEndDate={setEndDateLabel}
            handleFileTypeChange={(event) => {
              handleFileChange(event);
            }}
            handlePublishedTypeChange={(event) => {
              handlePublishedChange(event);
            }}
            fileType={fileType}
            publishedType={publishedType}
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}
            handlePublishedTypeClear={handlePublishedTypeClear}
            handleFileTypeClear={handleFileTypeClear}
          />
          <Box sx={{ margin: theme.spacing(6) }}>
            <Tabs
              tabs={[
                {
                  id: 0,
                  label: "All files",
                  content: (
                    <Box
                      sx={{
                        marginTop: theme.spacing(8),
                        gap: theme.spacing(6),
                        display: "flex",
                        flexWrap: "wrap",
                        maxHeight: "450px",
                        overflowY: "auto",
                        ...SCROLLBAR_STYLE_2
                      }}
                    >
                      {renderFileCards()}
                    </Box>
                  ),
                },
                {
                  id: 1,
                  label: "Slides",
                  disabled: true,
                },
                {
                  id: 2,
                  label: "Docs",
                  disabled: true,
                },
              ]}
              tabWidth="85px"
              activeTabColor={theme.palette.primary.primary500}
              nonActiveTabColor={theme.palette.textColor.mediumEmphasis}
              activeLabelColor={theme.palette.primary.primary500}
            />
          </Box>
        </Box>
      }
    />
  );
};
