import { Stack } from "@mui/material";
import TypographyComponent from "../../atoms/Typography";
import theme from "../../../theme/theme";
import InputField from "../../atoms/InputField";
import ButtonComponent from "../../atoms/Button";
import {
  createNewPassword,
  newPassword,
  confirmPasswordText,
  passwordPlaceholder,
  resetButtonText,
  changePassword,
  PASSWORD_ERROR,
  CONFIRM_PASSWORD_ERROR,
} from "../../../constants";
import { useEffect, useState } from "react";
import { validateString } from "../../../utils/functions";
import { PASSWORD_REGEX } from "../../../utils/regex";

interface CreateNewPasswordProps {
  // eslint-disable-next-line no-unused-vars
  handlePasswordChange:(password: string)=>void
}

const CreateNewPassword = ({handlePasswordChange}:CreateNewPasswordProps) => {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(" ");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordErr, setConfirmPasswordErr] = useState(" ");
  const [isFocused,setIsFocused]=useState({
    password:false,
    confirmPassword:false
  })

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  useEffect(() => {
    if (password.length > 0) {
      setPasswordError(
        validateString(password, PASSWORD_REGEX) ? " " : PASSWORD_ERROR
      );
    }
    if (confirmPassword.length > 0) {
      setConfirmPasswordErr(
        password === confirmPassword ? " " : CONFIRM_PASSWORD_ERROR
      );
    }
  }, [password, confirmPassword]);

  const isButtonEnabled =
    passwordError === PASSWORD_ERROR ||
    confirmPasswordErr === CONFIRM_PASSWORD_ERROR ||
    password === "" ||
    confirmPassword === "";

  return (
    <Stack
      direction={"column"}
      width={theme.spacing(89)}
      justifyContent={"flex-start"}
    >
      <Stack width={theme.spacing(67)} gap={theme.spacing(1)}>
        <TypographyComponent variant="h2">
          {createNewPassword}
        </TypographyComponent>
        <TypographyComponent
          variant="overline"
          color={theme.palette.textColor.mediumEmphasis}
        >
          {changePassword}
        </TypographyComponent>
      </Stack>
      <Stack direction={"column"}>
        <Stack direction={"column"} marginTop={theme.spacing(8)}>
          <TypographyComponent variant="body1">
            {newPassword}
          </TypographyComponent>
          <InputField
            placeHolder={passwordPlaceholder}
            width={theme.spacing(89)}
            color={theme.palette.textColor.black}
            height={theme.spacing(12)}
            sx={{ marginTop: "6px" }}
            onChange={handlePassword}
            errorMessage={!isFocused.password ? passwordError : " "}
            onFocus={() => {
              setIsFocused({ ...isFocused, password: true });
            }}
            onBlur={() => {
              setIsFocused({ ...isFocused, password: false });
            }}
            type="password"
          />
        </Stack>
        <Stack direction={"column"} marginTop={theme.spacing(1.25)}>
          <TypographyComponent variant="body1">
            {confirmPasswordText}
          </TypographyComponent>
          <InputField
            placeHolder={passwordPlaceholder}
            width={theme.spacing(89)}
            color={theme.palette.textColor.black}
            height={theme.spacing(12)}
            sx={{ marginTop: "6px" }}
            onChange={handleConfirmPassword}
            errorMessage={!isFocused.confirmPassword ? confirmPasswordErr : " "}
            onFocus={() => {
              setIsFocused({ ...isFocused, confirmPassword: true });
            }}
            onBlur={() => {
              setIsFocused({ ...isFocused, confirmPassword: false });
            }}
            type="password"
          />
        </Stack>
      </Stack>
      <Stack marginTop={theme.spacing(3)}>
        <ButtonComponent
          variant="contained"
          color={"primary"}
          sx={{ height: theme.spacing(12) }}
          disabled={isButtonEnabled}
          onClick={() => handlePasswordChange(password)}
        >
          {resetButtonText}
        </ButtonComponent>
      </Stack>
    </Stack>
  );
};

export default CreateNewPassword;
