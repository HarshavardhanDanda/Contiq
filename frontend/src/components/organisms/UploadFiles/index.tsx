import React from "react";
import { Box, Stack } from "@mui/material";
import ModalMolecule from "../../molecules/Modal";
import { TabData } from "../../molecules/Tabs";
import { IconComponent } from "../../atoms/Icon";
import uploadIcon from "../../../../public/assets/images/upload.svg";
import pdfIcon from "../../../../public/assets/images/icon-pdf.svg";
import theme from "../../../theme/theme";
import TypographyComponent from "../../atoms/Typography";
import ButtonComponent from "../../atoms/Button";
import { useFileUpload } from "./hooks";
import googleDrive from "../../../../public/assets/images/Google drive.svg";
import dropBox from "../../../../public/assets/images/dropBox.svg";
import cloudIcon from "../../../../public/assets/images/cloud.svg";
import teraBox from "../../../../public/assets/images/teraBox.svg";
import SyncDrive from "../SyncDrive";
import {
  CHOOSE_FILE_BUTTON,
  DROPFILES,
  DROP_FROM_DRIVE,
  UPLOAD_FILES_BUTTON,
  REPLACE_EXISTING_FILE,
  CLOUD_STORAGE,
  UPLOADS,
  UPLOADING,
} from "../../../constants";
import ProgressBar from "../../atoms/ProgressBar";
import {
  UploadModalContainer,
  DialogHeader,
  Footer,
  FooterActions,
  StyledCancelButton,
  StyledUploadButton,
  UploadCard,
  StyledButton,
  GridContainer,
  FileDetails,
  FileName,
  StyledContainer,
  StyledTabs,
} from "./StyledComponents";
import ChooseDriveFolder from "../ChooseDriveFolder";

export const iconsData = [
  {
    id: 1,
    src: googleDrive,
    alt: "google-drive-icon",
  },
  {
    id: 2,
    src: dropBox,
    alt: "drop-box-icon",
  },
  {
    id: 3,
    src: cloudIcon,
    alt: "cloud-icon",
  },
  {
    id: 4,
    src: teraBox,
    alt: "tera-box-icon",
  },
];

export interface UploadFromLocalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadFiles: React.FC<UploadFromLocalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    selectedFiles,
    fileInputRef,
    progressModalOpen,
    openProgressModal,
    handleUpload,
    handleFileChange,
    triggerFileInput,
    openUploadModal,
    uploadConfirmOpen,
    openUploadConfirmModal,
    closeUploadConfirmModal,
    modalTitle,
    isDriveLoading,
    handleClientLoad,
    allDriveFiles,
    setModalTitle,
    isDriveFolderSelectModal,
    setIsDriveFolderSelectModal
  } = useFileUpload(onClose);

const UploadConfirmationContent = () => {
    return (
      <UploadModalContainer>
        <DialogHeader>
          <TypographyComponent
            variant="h3"
            style={{
              color: theme.palette.textColor.white,
              alignSelf: "stretch",
            }}
          >
            {"Upload Options"}
          </TypographyComponent>
        </DialogHeader>

        {selectedFiles.map((selectedFile) => (
          <>
            <TypographyComponent
              variant="subtitle2"
              style={{
                color: theme.palette.textColor.highEmphasis,
                width: "432px",
              }}
            >
              <span style={{ color: theme.palette.textColor.white }}>
                {selectedFile?.name || ""}
              </span>
              {REPLACE_EXISTING_FILE}
            </TypographyComponent>
          </>
        ))}

        <Footer>
          <FooterActions>
            <StyledCancelButton
              variant="outlined"
              onClick={() => {
                // closeUploadModal();
                closeUploadConfirmModal();
                openUploadModal();
              }}
            >
              {"Cancel"}
            </StyledCancelButton>
            <StyledUploadButton
              variant="contained"
              onClick={() => {
                // Upload Logic.
                openProgressModal();
                handleUpload();
              }}
            >
              {"Upload"}
            </StyledUploadButton>
          </FooterActions>
        </Footer>
      </UploadModalContainer>
    );
  };

  const UploadFromLocal = () => {
    return (
      <UploadCard hasSelectedFiles={Boolean(selectedFiles.length)}>
        {selectedFiles.length === 0
          ? renderFilePrompt()
          : renderSelectedFiles()}

        <input
          data-testid="file-input"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          style={{ display: "none" }}
          ref={fileInputRef}
          multiple
        />
      </UploadCard>
    );
  };

  function renderFilePrompt() {
    return (
      <Box
        width={"158px"}
        height={"78px"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <IconComponent src={uploadIcon} alt={"upload-icon"} />
        <TypographyComponent
          marginTop={"12px"}
          variant="subtitle2"
          color={theme.palette.textColor.white}
        >
          {DROPFILES}
        </TypographyComponent>

        <StyledButton
          data-testid="choose-file"
          variant="outlined"
          onClick={triggerFileInput}
        >
          <TypographyComponent
            variant="body1"
            color={theme.palette.textColor.white}
          >
            {CHOOSE_FILE_BUTTON}
          </TypographyComponent>
        </StyledButton>
      </Box>
    );
  }

  function renderSelectedFiles() {
    return (
      <>
        <GridContainer>
          {selectedFiles.map((selectedFile) => (
            <FileDetails key={selectedFile.name}>
              <IconComponent
                src={pdfIcon}
                alt="pdf-icon"
                style={{
                  display: "flex",
                  width: "80px",
                  height: "80px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
              <FileName
                variant="body1"
                style={{ color: theme.palette.textColor.white }}
                title={selectedFile.name}
                key={selectedFile.name}
              >
                {selectedFile.name}
              </FileName>
            </FileDetails>
          ))}
        </GridContainer>

        <ButtonComponent
          variant="contained"
          onClick={() => {
            openUploadModal();
            openUploadConfirmModal();
          }}
        >
          {UPLOAD_FILES_BUTTON}
        </ButtonComponent>
      </>
    );
  }
  const UploadFromDrive = () => {
    const handleUploadFromDrive = () => {
      handleClientLoad();
      setModalTitle("");
    };
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign={"center"}
      >
        <TypographyComponent
          width={"215px"}
          variant="subtitle2"
          color={theme.palette.textColor.white}
        >
          {DROP_FROM_DRIVE}
        </TypographyComponent>
        <Stack direction={"row"} spacing={8} width={"296px"} marginTop={"32px"}>
          {iconsData.map((icon) => (
            <Box
              data-testid="upload-from-drive"
              key={icon.id}
              width={"50px"}
              height={"50px"}
              bgcolor={theme.palette.textColor.white}
              borderRadius={"4px"}
              padding={"9px"}
              marginTop={"32px"}
              onClick={() =>
                icon.src === googleDrive && handleUploadFromDrive()
              }
              sx={icon.src === googleDrive ? { cursor: "pointer" } : undefined}
            >
              <IconComponent src={icon.src} alt={icon.alt} />
            </Box>
          ))}
        </Stack>
      </Box>
    );
  };

  const tabsData: TabData[] = [
    {
      id: 0,
      label: UPLOADS,
      content: <UploadFromLocal />,
    },
    {
      id: 1,
      label: CLOUD_STORAGE,
      content: (
        <StyledContainer>
          <UploadFromDrive />
        </StyledContainer>
      ),
    },
  ];

  const handleNavigateBackModal = () => {
    if(isDriveFolderSelectModal) {
      setIsDriveFolderSelectModal(false);
      setModalTitle("Upload files")
    }else {
      setIsDriveFolderSelectModal(true);
      setModalTitle("Add files");
    }
  }

  return (
    <ModalMolecule
      open={isOpen}
      onClose={onClose}
      title={modalTitle}
      isConfirmModal={uploadConfirmOpen}
      content={getContent()}
      handleNavigateBack={handleNavigateBackModal}
    />
  );

  function getContent(): React.ReactNode {
    if (progressModalOpen) {
      return (
        <>
          <GridContainer>
            {selectedFiles.map((selectedFile) => (
              <FileDetails key={selectedFile.name}>
                <IconComponent
                  src={pdfIcon}
                  alt="pdf-icon"
                  style={{
                    display: "flex",
                    width: "80px",
                    height: "80px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
                <FileName
                  variant="body1"
                  style={{ color: theme.palette.textColor.white }}
                  title={selectedFile.name}
                  key={selectedFile.name}
                >
                  {selectedFile.name}
                </FileName>
              </FileDetails>
            ))}
          </GridContainer>
          <Box
            style={{
              marginTop: "32px",
              display: "flex",
              width: "346px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <ProgressBar width={"346px"} height={"8px"} />
            <TypographyComponent
              variant="caption1"
              color={theme.palette.textColor.highEmphasis}
              style={{ marginTop: "10px" }}
            >
              {UPLOADING}
            </TypographyComponent>{" "}
          </Box>
        </>
      );
    } else if (!progressModalOpen && uploadConfirmOpen) {
      return <UploadConfirmationContent />;
    } else if (isDriveLoading) {
      return <SyncDrive />;
    } else if (isDriveFolderSelectModal) {
      return (
        <ChooseDriveFolder
          folders={allDriveFiles}
          setTitle={setModalTitle}
          setIsDriveFolderSelectModal={setIsDriveFolderSelectModal}
          onClose={onClose}
        />
      );
    } else {
      return (
        <StyledTabs
          tabs={tabsData}
          tabWidth="348px"
          tabBorder={`1px solid ${theme.palette.grey[300]}`}
          activeTabColor={theme.palette.primary.primary500}
          nonActiveTabColor="#ccc"
          activeLabelColor={theme.palette.textColor.white}
        />
      );
    }
  }
};

export default UploadFiles;
