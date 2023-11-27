import React from "react";
import { Box, styled } from "@mui/material";
import theme from "../../../theme/theme";
import { IconComponent } from "../../atoms/Icon";
import TypographyComponent, {
  TypographyComponentProps,
} from "../../atoms/Typography/index";

export interface SnackBarProps {
  text: TypographyComponentProps;
  startIconSrc: string;
  endIconSrc: string;
  onClose?: () => void;
}

const StyledSnackBarBox = styled(Box)({
  display: "flex",
  width: theme.spacing(50),
  height: theme.spacing(10),
  padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
  alignItems: "center",
  justifyContent: "space-evenly",
  borderRadius: theme.spacing(1),
  background: theme.palette.grey[400],
});

const SnackBar: React.FC<SnackBarProps> = ({
  text,
  startIconSrc,
  endIconSrc,
  onClose,
}) => {
  return (
    <StyledSnackBarBox>
      <IconComponent src={startIconSrc} alt="complete-icon" />
      <TypographyComponent variant={text.variant} style={text.style}>
        {text.children}
      </TypographyComponent>
      <IconComponent
        src={endIconSrc}
        alt="close-icon"
        onClick={onClose}
        style={{ cursor: "pointer" }}
      />
    </StyledSnackBarBox>
  );
};

export default SnackBar;
