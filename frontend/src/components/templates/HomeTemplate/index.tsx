import { Stack, styled } from "@mui/material";
import React from "react";
import theme from "../../../theme/theme";
import HeaderComponent from "../../organisms/Header";

interface HomeTemplateProps {
  sidebar?: React.ReactNode;
  content?: React.ReactNode;
}

const StyledOutline = styled(Stack)({
  margin: "0px",
  width: "100%",
  height: "100vh",
  backgroundColor: theme.palette.textColor.white,
});

const HomeTemplate = ({ sidebar, content }: HomeTemplateProps) => {
  return (
    <StyledOutline>
      <div>
        <HeaderComponent data-testid="header-component"></HeaderComponent>
      </div>
      <Stack direction="row" width="100%" maxHeight="calc(100vh - 60px)">
        <div>{sidebar}</div>
        <div style={{ flex: 1, maxHeight: "calc(100vh - 60px)" }}>
          {content}
        </div>
      </Stack>
    </StyledOutline>
  );
};

export default HomeTemplate;
