import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { Logout } from ".";

export default {
  title: "organisms/Logout",
  component: Logout,
} as Meta;

const Template: StoryFn = () => <Logout />;

export const Default = Template.bind({});
