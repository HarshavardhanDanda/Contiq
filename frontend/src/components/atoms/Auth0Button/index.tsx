import styled from "@emotion/styled";
import { IconComponent } from "../Icon";
import { Button, ButtonProps, Typography } from "@mui/material";
import theme from "../../../theme/theme";

export interface Auth0ButtonProps extends ButtonProps {
  text: string;
  src: string;
  alt: string;
  width?: string;
}

const StyledAuth0Button = styled(Button)({
  textTransform: "none",
  boxShadow: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "11px 10px",
  background: theme.palette.structural.background3,
  "&:hover": {
    background: theme.palette.structural.background3,
  },
  "&:active, &:focus": {
    background: theme.palette.structural.background3,
  },
  "@media (max-width: 320px)": {
    width: "90%",
    padding: "8px 10px",
    fontSize: "14px",
  },
});

export const Auth0Button = ({ ...props }: Auth0ButtonProps) => {
  return (
    <StyledAuth0Button
      sx={{ width: props.width }}
      startIcon={<IconComponent src={props.src} alt={props.alt} />}
      onClick={props.onClick}
    >
      <Typography variant="body1" color={theme.palette.textColor.black}>
        {props.text}
      </Typography>
    </StyledAuth0Button>
  );
};
