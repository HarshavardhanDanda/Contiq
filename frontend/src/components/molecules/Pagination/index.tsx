import styled from "@emotion/styled";
import { Box, IconButton, Typography } from "@mui/material";
import theme from "../../../theme/theme";
import { IconComponent } from "../../atoms/Icon";
import minusIcon from "../../../../public/assets/images/minus.svg";
import plusIcon from "../../../../public/assets/images/plus.svg";

export interface PaginationBarProps {
  totalPages: number;
  pageNumber: number;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  zoomPercent: number;
}

const StyledOuterBox = styled(Box)({
  height: "52px",
  display: "inline-flex",
  padding: `${theme.spacing(2)} ${theme.spacing(7.5)}`,
  alignItems: "center",
  gap: theme.spacing(15.5),
  borderRadius: theme.spacing(2),
  background: theme.palette.grey[400],
});

const StyledZoomBox = styled(Box)({
  maxWidth: `${theme.spacing(30.5)}`,
  height: "36px",
  display: "flex",
  padding: `${theme.spacing(1.5)} ${theme.spacing(3)}`,
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(2.5),
  borderRadius: theme.spacing(2.5),
  background: theme.palette.grey[300],
});

export const PaginationBar = ({ ...props }: PaginationBarProps) => {
  return (
    <StyledOuterBox>
      <Typography color={theme.palette.textColor.highEmphasis} variant="body1">
        Page {props.pageNumber} of {props.totalPages}
      </Typography>
      <StyledZoomBox>
        <IconButton onClick={props.handleZoomOut}>
          <IconComponent src={minusIcon} alt={"zoom-out-icon"} />
        </IconButton>
        <Typography color={theme.palette.textColor.white} variant="body1">
          {props.zoomPercent}%
        </Typography>
        <IconButton onClick={props.handleZoomIn}>
          <IconComponent src={plusIcon} alt={"zoom-in-icon"} />
        </IconButton>
      </StyledZoomBox>
    </StyledOuterBox>
  );
};
