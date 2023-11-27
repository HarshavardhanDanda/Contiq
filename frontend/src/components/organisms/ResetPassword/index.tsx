import { Stack } from "@mui/material";
import TypographyComponent from "../../atoms/Typography";
import theme from "../../../theme/theme";
import InputField from "../../atoms/InputField";
import ButtonComponent from "../../atoms/Button";
import {
  resetPassword,
  verificationMail,
  send,
  emailText,
  emailPlaceholder,
  notValidEmail,
} from "../../../constants";
import { useState } from "react";
import { validateString, isEmptyObject } from "../../../utils/functions";
import { EMAIL_REGEX } from "../../../utils/regex";
import { checkEmailAvailability } from "../../../services/UserService";

interface ResetPasswordProps{
  // eslint-disable-next-line no-unused-vars
  handleResetClick:(email: string)=>void
}

const ResetPassword = ({handleResetClick}:ResetPasswordProps) => {
  const [email, setEmail] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>(" ");
  const [isEmailFocused,setIsEmailFocused]=useState<boolean>(false)
  const handleEmailInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const mail = event.target.value;
    const isValidMail = validateString(mail, EMAIL_REGEX);
    setEmail(mail);
    if(!isValidMail){
      setErrorMsg(notValidEmail)
    }else {
      try {
        const user = await checkEmailAvailability(mail);
        console.log(user);
        if (!isEmptyObject(user)) {
          setErrorMsg(" ");
        } else {
          setErrorMsg("Email doesn't match our records");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <Stack
      direction={"column"}
      width={theme.spacing(89)}
      height={theme.spacing(64)}
      justifyContent={"flex-start"}
    >
      <Stack
        width={theme.spacing(67)}
        gap={theme.spacing(1)}
        marginBottom={theme.spacing(8)}
      >
        <TypographyComponent variant="h2">{resetPassword}</TypographyComponent>
        <TypographyComponent
          variant="overline"
          color={theme.palette.textColor.mediumEmphasis}
        >
          {verificationMail}
        </TypographyComponent>
      </Stack>
      <Stack direction={"column"}>
        <TypographyComponent variant="body1">{emailText}</TypographyComponent>
        <InputField
          value={email}
          errorMessage={!isEmailFocused ? errorMsg : " "}
          placeHolder={emailPlaceholder}
          onChange={handleEmailInput}
          width={theme.spacing(89)}
          sx={{ marginTop: "6px" }}
          color={theme.palette.textColor.black}
          height={theme.spacing(12)}
          onFocus={() => {
            setIsEmailFocused(true);
          }}
          onBlur={() => {
            setIsEmailFocused(false);
          }}
        />
      </Stack>
      <Stack marginTop={theme.spacing(3)}>
        <ButtonComponent
          variant="contained"
          color={"primary"}
          sx={{ height: theme.spacing(12) }}
          disabled={errorMsg !== " " || email === ""}
          onClick={() => handleResetClick(email)}
        >
          {send}
        </ButtonComponent>
      </Stack>
    </Stack>
  );
};

export default ResetPassword;
