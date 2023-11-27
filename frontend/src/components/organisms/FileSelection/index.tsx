import React from "react";
import { styled } from "@mui/material";
import ModalMolecule from "../../molecules/Modal";
import FileSelect from "../../molecules/FileSelect";
import theme from "../../../theme/theme";
import ButtonComponent from "../../atoms/Button";
import { useFileSelection } from "./hooks";

const FIleSelectModalContainer = styled("div")({
  width: "100%",
  height: "598px",
  borderRadius: "4px",
  background: theme.palette.grey[400],
});

const SyncButton = styled(ButtonComponent)({
  display: "flex",
  width: "75px",
  height: "34px",
  padding: "6px 8px",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  flexShrink: 0,
  borderRadius: "4px",
  color: theme.palette.textColor.white,
  background: theme.palette.primary.primary500,
});

const BackButton = styled(ButtonComponent)({
  "&.MuiButton-outlined": {
    borderColor: theme.palette.textColor.white,
    color: theme.palette.textColor.white,
  },
  "&.MuiButton-outlined:hover": {
    backgroundColor: "transparent",
  },
  display: "flex",
  width: "75px",
  height: "34px",
  padding: "6px 8px",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  flexShrink: 0,
  borderRadius: "3px",
  border: `1px solid ${theme.palette.grey[200]}`,
});

const FileContainer = styled("div")({
  maxHeight: "calc(4 * 74px + 3 * 16px)",

  overflowY: "auto",
  marginBottom: theme.spacing(4),
  gap: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  paddingLeft: theme.spacing(6),
  paddingRight: theme.spacing(6),
  paddingTop: theme.spacing(8),
});

const ButtonContainer = styled("div")({
  "@media (max-width: 768px)": {
    gap: theme.spacing(2),
  },
  display: "flex",
  justifyContent: "space-between",
  gap: theme.spacing(3),
  paddingLeft: theme.spacing(6),
  paddingRight: theme.spacing(6),
  alignSelf: "flex-end",
  marginTop: "auto",
});

const ContentContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  padding: `${theme.spacing(8)} ${theme.spacing(6)}`,
});

export interface FileSelectionOrganismProps {
  files: { filename: string }[];
}

const FileSelectionOrganism: React.FC<FileSelectionOrganismProps> = ({
  files,
}) => {
  const { handleFileSelect, handleSyncClick, handleBackClick } =
    useFileSelection(files);

  const handleClose = () => {
    // Logic for closing modal
  };

  const handleNavigateBack = () => {
    // Logic for navigation back
  };

  return (
    <ModalMolecule
      open={true}
      onClose={handleClose}
      handleNavigateBack={handleNavigateBack}
      title="Zemoso decks"
      content={
        <FIleSelectModalContainer>
          <ContentContainer>
            <FileContainer>
              {files.map((file) => (
                <FileSelect
                  key={file.filename}
                  onSelect={(e) =>
                    handleFileSelect(file.filename, e.target.checked)
                  }
                  fileName={file.filename}
                />
              ))}
            </FileContainer>
            <ButtonContainer>
              <BackButton variant="outlined" onClick={handleBackClick}>
                Back
              </BackButton>
              <SyncButton variant="contained" onClick={handleSyncClick}>
                Sync
              </SyncButton>
            </ButtonContainer>
          </ContentContainer>
        </FIleSelectModalContainer>
      }
    />
  );
};

export default FileSelectionOrganism;
