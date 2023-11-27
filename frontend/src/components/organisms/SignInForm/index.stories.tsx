import React from "react";
import { SignInForm } from ".";
import { Box } from "@mui/material";

export default {
  title: "organisms/SignInForm",
  component: SignInForm,
};

const Template = () => (
  <Box margin="50px" width="356px" height="100%">
    <SignInForm />
  </Box>
);

export const SignIn_Form = Template.bind({});
