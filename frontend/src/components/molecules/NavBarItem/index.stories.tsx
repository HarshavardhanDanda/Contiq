import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import NavBarItem, { NavBarItemProps } from ".";
import homeIcon from "../../../../public/assets/images/home.svg";
import homeIconActive from "../../../../public/assets/images/home-active.svg";

import theme from "../../../theme/theme";

export default {
  title: "Molecules/NavBarItem",
  component: NavBarItem,
  argTypes: {
    iconSrc: { control: "text" },
    caption: { control: "text" },
    isActive: { control: "boolean" },
    onClick: { action: "clicked" },
  },
} as Meta;

const Template: StoryFn<NavBarItemProps> = (args) => <NavBarItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  iconSrc: {
    src: homeIcon,
    alt: "home-icon",
    style: { color: theme.palette.grey[200] },
  },
  text: {
    children: "Home",
    variant: "caption1",
  },
  isActive: false,
};

export const Active = Template.bind({});
Active.args = {
  iconSrc: {
    src: homeIconActive,
    alt: "home-icon",
    style: { color: theme.palette.textColor.white },
  },
  text: {
    children: "Home",
    variant: "caption1",
  },
  isActive: true,
};
