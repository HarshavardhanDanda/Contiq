import { Stack, styled } from "@mui/material";
import TypographyComponent from "../../atoms/Typography";
import theme from "../../../theme/theme";
import RadioButton from "../../atoms/RadioButton";
import fileDrive from "../../../../public/assets/images/file drive.svg";
import arrowIcon from "../../../../public/assets/images/chevron.svg";
import ButtonComponent from "../../atoms/Button";
import { Folder } from "../UploadFiles/hooks";
import { Folder as FolderComponent } from "../../molecules/Folder";
import SelectDriveFiles from "../SelectDriveFiles";
import { useChooseDriveFolder } from "./hooks";
import { SCROLLBAR_STYLE,CHOOSE_FOLDERS, BACK, SYNC} from "../../../constants";

export interface ChooseDriveFolderProps {
  folders: Folder[];
  // eslint-disable-next-line no-unused-vars
  setTitle: (title: string) => void;
  // eslint-disable-next-line no-unused-vars
  setIsDriveFolderSelectModal: (folderModal: boolean) => void;
  onClose: () => void;
}

const StyledStack = styled(Stack)(SCROLLBAR_STYLE);

const ChooseDriveFolder = (props: ChooseDriveFolderProps) => {
  const { folders, setTitle, setIsDriveFolderSelectModal, onClose } = props;
  const { folderData, setFolderData, navigateBackToTabs, handleNavigateBack } =
    useChooseDriveFolder(setTitle, setIsDriveFolderSelectModal);

  return (
    <>
      {!folderData.id.length ? (
        <Stack
          direction="column"
          width={"100%"}
          height={"100%"}
          marginLeft={"40px"}
          marginTop={"16px"}
        >
          <TypographyComponent
            variant="body2"
            color={theme.palette.textColor.white}
          >
            {CHOOSE_FOLDERS}
          </TypographyComponent>
          <Stack
            direction={"row"}
            gap={"16px"}
            marginBottom={"32px"}
            marginTop={"12px"}
          >
            <RadioButton
              label="Sync entire drive"
              isChecked={false}
              value="sync all"
            />
            <RadioButton
              label="Sync folders"
              isChecked={true}
              value="sync folders"
            />
          </Stack>
          <StyledStack
            direction={"column"}
            gap={"16px"}
            maxHeight={"260px"}
            sx={{ overflowY: "auto" }}
            width={"95%"}
          >
            {folders.map((folder) => {
              return (
                <FolderComponent
                  key={folder.name}
                  text={folder.name}
                  startIcon={fileDrive}
                  startAlt={"file-drive-icon"}
                  endIcon={arrowIcon}
                  endAlt={"arrow-icon"}
                  onClick={() => {
                    setFolderData(folder);
                    setTitle(folder.name);
                  }}
                />
              );
            })}
          </StyledStack>
          <Stack
            direction="row"
            gap={"12px"}
            top={"524px"}
            left={"505px"}
            sx={{position: "absolute"}}
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
              onClick={() => navigateBackToTabs()}
            >
              <TypographyComponent
                variant="body1"
                color={theme.palette.grey[200]}
              >
                {BACK}
              </TypographyComponent>
            </ButtonComponent>
            <ButtonComponent variant="contained">
              <TypographyComponent
                variant="body1"
                color={theme.palette.textColor.white}
              >
                {SYNC}
              </TypographyComponent>
            </ButtonComponent>
          </Stack>
        </Stack>
      ) : (
        <SelectDriveFiles
          folder={folderData}
          navigateBack={() => handleNavigateBack()}
          onClose={onClose}
        />
      )}
    </>
  );
};

export default ChooseDriveFolder;
