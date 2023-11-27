import { Stack } from "@mui/material";
import TypographyComponent from "../../atoms/Typography";
import theme from "../../../theme/theme";
import ButtonComponent from "../../atoms/Button";
import SuccessIcon from "../../../../public/assets/images/resetSuccess.gif";
import { IconComponent } from "../../atoms/Icon";
import { passwordReset, resetSuccess, continueText } from "../../../constants";
import { useNavigate } from "react-router-dom";

const ResetPasswordSuccess = () => {
  const navigate = useNavigate();
  const handlePasswordReset = () => {
    navigate('/')
  }
  return (
    <Stack
      direction={"column"}
      gap={theme.spacing(9)}
      width={theme.spacing(89)}
      height={theme.spacing(64)}
      justifyContent={"flex-start"}
    >
      <Stack width={theme.spacing(60)} gap={theme.spacing(1)}>
        <Stack direction={"row"} gap={theme.spacing(3)} alignItems={"center"}>
          <TypographyComponent variant="h2">
            {passwordReset}
          </TypographyComponent>
          <IconComponent
            src={SuccessIcon}
            alt="success"
            width={theme.spacing(6)}
            height={theme.spacing(6)}
            style={{ marginTop: theme.spacing(1.25) }}
          />
        </Stack>
        <TypographyComponent
          variant="overline"
          color={theme.palette.textColor.mediumEmphasis}
        >
          {resetSuccess}
        </TypographyComponent>
      </Stack>
      <Stack>
        <ButtonComponent
          variant="contained"
          color={"primary"}
          sx={{ height: theme.spacing(12) }}
          onClick={handlePasswordReset}
        >
          {continueText}
        </ButtonComponent>
      </Stack>
    </Stack>
  );
};

export default ResetPasswordSuccess;
