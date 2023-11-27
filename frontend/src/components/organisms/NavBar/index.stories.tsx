import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import NavBar, { NavBarProps } from ".";

export default {
  title: "Organisms/NavBar",
  component: NavBar,
} as Meta;

const Template: StoryFn<NavBarProps> = () => <NavBar activeItem="home"/>;

export const Default = Template.bind({});
