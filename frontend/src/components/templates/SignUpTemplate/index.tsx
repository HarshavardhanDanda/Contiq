import React from "react";
import { Box, styled } from "@mui/material";
import { IconComponent } from "../../atoms/Icon";
import leftBodyImg from "../../../../public/assets/images/signupImage.png";

interface SignUpTemplateProps {
  children: React.ReactNode;
}

const StyledImage = styled(IconComponent)({
  width: "100%",
  height: "100%",
});

const StyledForm = styled(Box)({
  marginTop: "80px",
  marginLeft: "80px",
  marginRight: "22%",
  height: "100%"
});

const StyledGrid = styled("div")({
  display: "grid",
  gridTemplateColumns: "58% 42%",
  height: "100vh",
  overflowY: "hidden",
  "@media (max-width: 768px)": {
    gridTemplateColumns: "100%",
    gridTemplateRows: "40% 60%",
    height: "100%"
  },
});

export const SignUpTemplate = ({ children }: SignUpTemplateProps) => {
  return (
    <StyledGrid>
      <StyledImage src={leftBodyImg} alt={"left-image"} />
      <StyledForm>{children}</StyledForm>
    </StyledGrid>
  );
};
