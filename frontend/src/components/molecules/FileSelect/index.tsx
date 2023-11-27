import { Stack, styled } from "@mui/material";
import React from "react";
import Checkbox from "../../atoms/Checkbox";
import fileDriveIcon from "../../../../public/assets/images/file drive.svg";
import { IconComponent } from "../../atoms/Icon";
import TypographyComponent from "../../atoms/Typography";
import theme from "../../../theme/theme";
import {
  CheckBoxOutlined,
  CheckBoxOutlineBlankOutlined,
} from "@mui/icons-material";

export interface FileSelectProps {
  // eslint-disable-next-line no-unused-vars
  onSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileName: string;
}

const StyledStack = styled(Stack)({
  gap: theme.spacing(4),
  alignItems: "center",
  padding: `${theme.spacing(3)} ${theme.spacing(6)} ${theme.spacing(3)} ${theme.spacing(10)}`,
  width: "100%",
  height: 74,
  backgroundColor: theme.palette.grey[400],
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: theme.spacing(1),
});

const FileSelect = (props: FileSelectProps) => {
  const { onSelect, fileName } = props;
  return (
    <StyledStack direction={"row"}>
      <Checkbox
        width="24px"
        height="24px"
        handleClick={onSelect}
        isFileCheckbox
        checkedIcon={<CheckBoxOutlined />}
        icon={<CheckBoxOutlineBlankOutlined />}
      />
      <IconComponent
        src={fileDriveIcon}
        width="50px"
        height="50px"
        alt="Drive"
      />
      <TypographyComponent
        variant="body1"
        color={theme.palette.textColor.white}
      >
        {fileName}
      </TypographyComponent>
    </StyledStack>
  );
};

export default FileSelect;
