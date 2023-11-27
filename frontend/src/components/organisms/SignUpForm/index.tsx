import { Stack, styled } from "@mui/material";
import TypographyComponent from "../../atoms/Typography";
import {
  ALREDY_HAVE_AN_ACCOUNT,
  CONTINUE_WITH_GOOGLE,
  CREATE_ACCOUNT,
  CREATE_PASSWORD,
  EMAIL,
  EMAILID,
  NAME,
  OR,
  PASSWORD,
  SIGNIN,
  SIGNUP,
  USER_NAME,
  emailPlaceholder,
  namePlaceholder,
} from "../../../constants";
import theme from "../../../theme/theme";
import InputField from "../../atoms/InputField";
import ButtonComponent from "../../atoms/Button";
import { DividerComponent } from "../../atoms/Divider";
import { Auth0Button } from "../../atoms/Auth0Button";
import googleLogo from "../../../../public/assets/images/google logo.svg";
import { useSignUpForm } from "./hooks";
import { useNavigate } from "react-router-dom";
import {
  checkEmailAvailability,
  createUser,
} from "../../../services/UserService";
import { useAuth0 } from "@auth0/auth0-react";
import { isEmptyObject } from "../../../utils/functions";


const StyledStack = styled(Stack)({
  width: "100%",
  height: "100%",
  flexDirection: "column",
});

const StyledButton = styled(ButtonComponent)({
  borderRadius: "4px",
  width: "100%",
  height: "48px",
  margin: "28px 0px 28px 0px",
  "&:hover": {
    backgroundColor: `${theme.palette.primary.primary500}`,
  },
});

const SignUpForm = () => {
  const { loginWithRedirect } = useAuth0();
  const {
    name,
    email,
    password,
    errors,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    isButtonEnabled,
    isInputsFocused,
    handleInputEmailFocus,
    handleInputNameFocus,
    handleInputPasswordFocus,
    handleInputEmailBlur,
    handleInputNameBlur,
    handleInputPasswordBlur,
  } = useSignUpForm();

  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/");
  };

  const handleCreateAccount = async () => {
    try {
      const user = await checkEmailAvailability(email.toLowerCase());
      if (isEmptyObject(user)) {
        await createUser({ username: name, email, password });
        navigate("/");
      } else {
        console.error("User with email already exists");
      }
    } catch (error) {
      console.error("An error occurred while creating an account:", error);
    }
  };


  const handleAuth0Click=()=>{
    localStorage.setItem("userDetails",JSON.stringify({id:1,name:USER_NAME,email:EMAIL}))
    loginWithRedirect({
      appState: {
        returnTo: "/home"
      },
      authorizationParams: {
        connection: "google-oauth2"
      }
    });
  }

  return (
    <StyledStack>
      <TypographyComponent
        variant="h2"
        color={theme.palette.textColor.black}
        marginBottom={theme.spacing(8)}
      >
        {SIGNUP}
      </TypographyComponent>
      <TypographyComponent
        variant="body1"
        color={theme.palette.textColor.black}
      >
        {NAME}
      </TypographyComponent>
      <InputField
        width="100%"
        height="48px"
        placeHolder={namePlaceholder}
        type="text"
        sx={{ marginTop: "6px" }}
        color={theme.palette.textColor.black}
        errorMessage={!isInputsFocused.name ? errors.name : ""}
        onChange={(event) => handleNameChange(event.target.value)}
        onFocus={handleInputNameFocus}
        onBlur={handleInputNameBlur}
        value={name}
      />
      <TypographyComponent
        variant="body1"
        color={theme.palette.textColor.black}
        marginTop={"20px"}
      >
        {EMAILID}
      </TypographyComponent>
      <InputField
        width="100%"
        height="48px"
        sx={{ marginTop: "6px" }}
        placeHolder={emailPlaceholder}
        color={theme.palette.textColor.black}
        errorMessage={!isInputsFocused.email ? errors.email : ""}
        onChange={(event) => {
          handleEmailChange(event.target.value);
        }}
        onFocus={handleInputEmailFocus}
        onBlur={handleInputEmailBlur}
        value={email}
      />
      <TypographyComponent
        variant="body1"
        color={theme.palette.textColor.black}
        marginTop={theme.spacing(5)}
      >
        {PASSWORD}
      </TypographyComponent>
      <InputField
        width="100%"
        height="48px"
        placeHolder={CREATE_PASSWORD}
        color={theme.palette.textColor.black}
        type="password"
        sx={{ marginTop: "6px" }}
        errorMessage={!isInputsFocused.password ? errors.password : ""}
        onChange={(event) => {
          handlePasswordChange(event.target.value);
        }}
        onFocus={handleInputPasswordFocus}
        onBlur={handleInputPasswordBlur}
        value={password}
      />
      <StyledButton
        variant="contained"
        color="primary"
        sx={{ height: theme.spacing(12) }}
        disableRipple
        disabled={!isButtonEnabled}
        onClick={handleCreateAccount}
      >
        {CREATE_ACCOUNT}
      </StyledButton>
      <DividerComponent text={OR} />
      <Stack marginBottom={"28px"}></Stack>
      <Auth0Button
        src={googleLogo}
        alt="google-logo"
        text={CONTINUE_WITH_GOOGLE}
        onClick={handleAuth0Click}
      />
      <Stack
        flexDirection={"row"}
        marginTop={theme.spacing(8)}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <TypographyComponent
          variant="caption1"
          color={theme.palette.textColor.mediumEmphasis}
        >
          {ALREDY_HAVE_AN_ACCOUNT}
        </TypographyComponent>
        <TypographyComponent
          variant="caption1"
          marginLeft={theme.spacing(1)}
          color={theme.palette.primary.primary500}
          onClick={handleSignInClick}
          style={{ cursor: "pointer" }}
        >
          {SIGNIN}
        </TypographyComponent>
      </Stack>
    </StyledStack>
  );
};
export default SignUpForm;
