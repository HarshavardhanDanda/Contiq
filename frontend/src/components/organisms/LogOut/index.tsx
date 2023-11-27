import styled from "@emotion/styled";
import { Box, Grid } from "@mui/material";
import TypographyComponent from "../../atoms/Typography";
import { USER, USER_ID, logoutItems } from "./logOutConstants";
import theme from "../../../theme/theme";
import { IconComponent } from "../../atoms/Icon";
import { useNavigate } from "react-router";

const StyledLogout = styled(Box)({
  width: "179px",
  display: "inline-flex",
  flexDirection: "column",
  alignItems: "flex-start",
  borderRadius: theme.spacing(1),
  border: `1px solid ${theme.palette.grey[100]}`,
  backgroundColor: theme.palette.textColor.white,
});

const StyledUserGrid = styled(Grid)({
  display: "flex",
  padding: `${theme.spacing(1)} ${theme.spacing(3)}`,
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  alignSelf: "stretch",
  borderBottom: `1px solid ${theme.palette.grey[100]}`,
});

const StyledMenuGrid = styled(Grid)({
  display: "flex",
  padding: theme.spacing(3),
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: theme.spacing(3),
});

export const Logout = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("userDetails");
    navigate("/")
  };
  return (
    <StyledLogout>
      <StyledUserGrid item container>
        <Grid item>
          <TypographyComponent
            variant="body1"
            color={theme.palette.textColor.black}
          >
            {USER}
          </TypographyComponent>
        </Grid>

        <TypographyComponent
          variant="overline"
          color={theme.palette.textColor.mediumEmphasis}
        >
          {USER_ID}
        </TypographyComponent>
      </StyledUserGrid>

      <StyledMenuGrid>
        {logoutItems.map((item) => (
          <Grid
            item
            key={item.id}
            container
            direction="row"
            columnGap={theme.spacing(2)}
            onClick={item.text === "Logout" ? handleLogout : undefined}
            style={{ cursor: item.text === "Logout" ? "pointer" : "default" }}
          >
            <IconComponent src={item.src} alt={item.alt} />

            <TypographyComponent
              color={theme.palette.textColor.black}
              variant="body2"
            >
              {item.text}
            </TypographyComponent>
          </Grid>
        ))}
      </StyledMenuGrid>
    </StyledLogout>
  );
};
