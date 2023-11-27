import { Stack, styled } from "@mui/material";
import TypographyComponent from "../../atoms/Typography";
import {
  CONTINUE_WITH_GOOGLE,
  CREATE_PASSWORD,
  EMAIL,
  EMAILID,
  FORGOT_PASSWORD,
  NOT_HAVE_AN_ACCOUNT,
  OR,
  PASSWORD,
  REMEMBER_ME,
  SIGNIN,
  SIGNUP,
  USER_NAME,
  emailPlaceholder,
} from "../../../constants";
import theme from "../../../theme/theme";
import InputField from "../../atoms/InputField";
import ButtonComponent from "../../atoms/Button";
import { DividerComponent } from "../../atoms/Divider";
import { Auth0Button } from "../../atoms/Auth0Button";
import googleLogo from "../../../../public/assets/images/google logo.svg";
import Checkbox from "../../atoms/Checkbox";
import { useSignInForm } from "./hook";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../services/UserService";
import { useAuth0 } from "@auth0/auth0-react";
import { isEmptyObject } from "../../../utils/functions";

const StyledSignInStack = styled(Stack)({
  width: "100%",
  height: "100%",
  flexDirection: "column",
});

const StyledSignInButton = styled(ButtonComponent)({
  borderRadius: "4px",
  width: "100%",
  height: "48px",
  margin: "28px 0px 22px 0px",
  "&:hover": {
    backgroundColor: `${theme.palette.primary.primary500}`,
  },
});

export const SignInForm = () => {
  const { loginWithRedirect } = useAuth0();
  const {
    emailId,
    password,
    handleEmailIdChange,
    handlePasswordInputChange,
    isSignInButtonEnabled,
    error,
    setError,
  } = useSignInForm();

  const navigate = useNavigate();

  const handleForgotPassword = () => {
    navigate("/resetpassword");
  };
  const handleSignInButton = async () => {
    try {
      const response = await loginUser(emailId, password);
      if (!isEmptyObject(response)) {
        const userData = {
          id: response.id,
          name: response.username,
          email: response.email,
        };
        localStorage.setItem("userDetails", JSON.stringify(userData));
        setTimeout(() => {
          navigate("/home");
        }, 500);
      } else {
        setError("Invalid Credentials!!!");
        console.error("User with given credentials does not exist!!");
      }
    } catch (error) {
      
    }
  };
  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const handleSignInAuth0Click=()=>{
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
    <StyledSignInStack>
      <TypographyComponent
        variant="h2"
        color={theme.palette.textColor.black}
        marginBottom={theme.spacing(8)}
      >
        {SIGNIN}
      </TypographyComponent>
      <TypographyComponent
        variant="body1"
        color={theme.palette.textColor.black}
      >
        {EMAILID}
      </TypographyComponent>
      <InputField
        width="100%"
        height="48px"
        sx={{ marginTop: "6px" }}
        placeHolder={emailPlaceholder}
        color={theme.palette.textColor.black}
        value={emailId}
        onChange={(e) => handleEmailIdChange(e.target.value)}
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
        // errorMessage={error}
        value={password}
        onChange={(e) => handlePasswordInputChange(e.target.value)}
      />
      <Stack
        direction={"row"}
        display={"flex"}
        justifyContent={"space-between"}
        marginLeft={"10px"}
        marginTop={theme.spacing(2)}
      >
        <Checkbox
          label={
            <TypographyComponent
              variant="caption1"
              color={theme.palette.textColor.lowEmphasis}
            >
              {REMEMBER_ME}
            </TypographyComponent>
          }
          width="20px"
          height="20px"
          style={{ color: theme.palette.grey[100] }}
        ></Checkbox>
        <TypographyComponent
          color={theme.palette.primary.primary500}
          variant="caption1"
          onClick={handleForgotPassword}
          style={{ cursor: "pointer" }}
        >
          {FORGOT_PASSWORD}
        </TypographyComponent>
      </Stack>
      <StyledSignInButton
        variant="contained"
        color="primary"
        disableRipple
        disabled={!isSignInButtonEnabled}
        data-testid="sign-in"
        sx={{ height: theme.spacing(12) }}
        style={{ color: theme.palette.textColor.white }}
        onClick={handleSignInButton}
      >
        {SIGNIN}
      </StyledSignInButton>
      {<TypographyComponent variant={"caption1"} color={"red"} sx={{textAlign: "center"}}>{error}</TypographyComponent>}
      <DividerComponent text={OR} />
      <Stack marginBottom={"28px"}></Stack>
      <Auth0Button
        src={googleLogo}
        alt="google-logo"
        text={CONTINUE_WITH_GOOGLE}
        onClick={handleSignInAuth0Click}
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
          {NOT_HAVE_AN_ACCOUNT}
        </TypographyComponent>
        <TypographyComponent
          variant="caption1"
          marginLeft={theme.spacing(1)}
          color={theme.palette.primary.primary500}
          style={{ cursor: "pointer" }}
          onClick={handleSignUpClick}
          data-testid="sign-up"
        >
          {SIGNUP}
        </TypographyComponent>
      </Stack>
    </StyledSignInStack>
  );
};
