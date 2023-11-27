import { Stack, styled } from "@mui/material";
import theme from "../../../theme/theme";
import ButtonComponent from "../../atoms/Button";
import FileSelect from "../../molecules/FileSelect";
import { Folder } from "../UploadFiles/hooks";
import { useSelectDriveFiles } from "./hooks";
import { SYNC, BACK, SCROLLBAR_STYLE } from "../../../constants";
import TypographyComponent from "../../atoms/Typography";

export interface ChooseDriveFolderProps {
  folder: Folder;
  navigateBack: () => void;
  onClose: () => void;
}

const StyledStack = styled(Stack)(SCROLLBAR_STYLE);

const SelectDriveFiles = (props: ChooseDriveFolderProps) => {
  const { folder, navigateBack, onClose } = props;
  const { setSelectedFiles, handleFileSelect, handleSync } =
    useSelectDriveFiles(onClose);
  return (
    <Stack
      direction="column"
      width={"100%"}
      height={"100%"}
      marginLeft={"40px"}
      marginTop={"32px"}
    >
      <StyledStack
        direction={"column"}
        gap={"16px"}
        maxHeight={"260px"}
        sx={{ overflowY: "auto" }}
        width={"95%"}
      >
        {folder.files.map((file) => {
          return (
            <FileSelect
              key={file.name}
              onSelect={() => {
                setSelectedFiles((prevSelectedFiles) =>
                  handleFileSelect(file, prevSelectedFiles)
                );
              }}
              fileName={file.name}
            />
          );
        })}
      </StyledStack>
      <Stack
        direction="row"
        top={"524px"}
        left={"505px"}
        gap={"12px"}
        sx={{ position: "absolute" }}
      >
        <ButtonComponent
          variant="outlined"
          sx={{
            color: theme.palette.textColor.white,
            borderColor: theme.palette.textColor.white,
            "&:hover": {
              borderColor: theme.palette.textColor.white,
            },
          }}
          onClick={() => navigateBack()}
        >
          <TypographyComponent variant="body1" color={theme.palette.grey[200]}>
            {BACK}
          </TypographyComponent>
        </ButtonComponent>
        <ButtonComponent variant="contained" onClick={handleSync}>
          <TypographyComponent
            variant="body1"
            color={theme.palette.textColor.white}
          >
            {SYNC}
          </TypographyComponent>
        </ButtonComponent>
      </Stack>
    </Stack>
  );
};

export default SelectDriveFiles;
