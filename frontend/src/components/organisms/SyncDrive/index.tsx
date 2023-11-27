import { Stack, styled } from "@mui/material";
import React from "react";
import { IconComponent } from "../../atoms/Icon";
import driveIcon from "../../../../public/assets/images/DriveIcon.svg";
import driveLoading from "../../../../public/assets/images/driveloading.gif";
import theme from "../../../theme/theme";
import TypographyComponent from "../../atoms/Typography";
import { DRIVE_SYNC, SYNC_IN_PROGRESS } from "../../../constants";

const StyledLoading = styled(Stack)({
  width: "86px",
  height: "86px",
  borderRadius: 4,
  backgroundColor: theme.palette.textColor.white,
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "10px",
});

const SyncDrive = () => {
  return (
    <Stack
      direction={"column"}
      gap={"20px"}
      alignItems={"center"}
      width={200}
      sx={{ position: "absolute", top: "180px" }}
    >
      <StyledLoading>
        <IconComponent src={driveIcon} alt="drive" width="55px" height="55px" />
      </StyledLoading>
      <Stack direction={"row"}>
        <IconComponent
          src={driveLoading}
          alt="drive-loader"
          width="30px"
          height="30px"
        />
        <TypographyComponent variant="h3" color={theme.palette.textColor.white}>
          {SYNC_IN_PROGRESS}
        </TypographyComponent>
      </Stack>
      <TypographyComponent
        variant="body2"
        color={theme.palette.textColor.white}
        sx={{ display: "flex", textAlign: "center" }}
      >
        {DRIVE_SYNC}
      </TypographyComponent>
    </Stack>
  );
};

export default SyncDrive;
