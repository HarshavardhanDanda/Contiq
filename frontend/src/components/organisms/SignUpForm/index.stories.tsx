import React from "react";
import { type StoryFn, Meta } from "@storybook/react";
import SignUpForm from ".";
import { Box } from "@mui/material";

export default {
  title: "organisms/SignUpForm",
  component: SignUpForm,
} as Meta;

const Template: StoryFn = () => (
  <Box margin="50px" width="356px" height="100%">
    <SignUpForm />
  </Box>
);

export const Default = Template.bind({});
