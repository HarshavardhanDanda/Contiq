import React from "react";
import { Meta, type StoryFn } from "@storybook/react";
import Avatar, { AvatarComponentProps } from "./index";

import profile from "../../../../public/assets/images/avatar.svg";

export default {
  title: "atoms/Avatar",
  component: Avatar,
} as Meta;

const Template: StoryFn<AvatarComponentProps> = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: profile,
  alt: "Default Avatar",
  sx: { width: 44, height: 44 },
};

export const Large = Template.bind({});
Large.args = {
  src: profile,
  alt: "Large Avatar",
  sx: { width: 80, height: 80 },
};
