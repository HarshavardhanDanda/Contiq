import styled from "@emotion/styled";
import { Box } from "@mui/material";
import TypographyComponent from "../../atoms/Typography";
import theme from "../../../theme/theme";
import { IconComponent } from "../../atoms/Icon";

export interface FolderProps {
  text: string;
  startIcon: string;
  startAlt: string;
  endIcon: string;
  endAlt: string;
  onClick: () => void;
}

const StyledOuterFolderBox = styled(Box)({
  display: "flex",
  maxWidth: "648px",
  width: "100%",
  height: "74px",
  padding: `${theme.spacing(3)} ${theme.spacing(4)}`,
  justifyContent: "space-between",
  alignItems: "center",
  flexShrink: 0,
  background: theme.palette.grey[400],
  border: "1px solid var(--grey-300, #343536)",
  borderRadius: theme.spacing(1),
  cursor: "pointer",

  "@media (max-width: 320px)": {
    padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
    height: `${theme.spacing(15)}`,
  },
});
const StyledInnerFolderBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(4),
});

export const Folder = ({ ...props }: FolderProps) => {
  return (
    <StyledOuterFolderBox onClick={props.onClick} data-testid="folder">
      <StyledInnerFolderBox>
        <IconComponent src={props.startIcon} alt={props.startAlt} />
        <TypographyComponent color={theme.palette.textColor.white}>
          {props.text}
        </TypographyComponent>
      </StyledInnerFolderBox>
      <IconComponent src={props.endIcon} alt={props.endAlt} />
    </StyledOuterFolderBox>
  );
};
