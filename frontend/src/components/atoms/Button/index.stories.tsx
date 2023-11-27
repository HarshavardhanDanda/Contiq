import React from "react";
import { type StoryFn, Meta } from "@storybook/react";
import ButtonComponent, { ButtonComponentProps } from "./index";

export default {
  title: "atoms/Button",
  component: ButtonComponent,
} as Meta;

const Template: StoryFn<ButtonComponentProps> = (args) => (
  <ButtonComponent {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  variant: "contained",
  color: "primary",
  children: "Primary Button",
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "contained",
  color: "secondary",
  children: "Secondary Button",
};

export const OutlinedPrimary = Template.bind({});
OutlinedPrimary.args = {
  variant: "outlined",
  color: "primary",
  children: "Outlined Primary Button",
};

export const OutlinedSecondary = Template.bind({});
OutlinedSecondary.args = {
  variant: "outlined",
  color: "secondary",
  children: "Outlined Secondary Button",
};

export const TextPrimary = Template.bind({});
TextPrimary.args = {
  variant: "text",
  color: "primary",
  children: "Text Primary Button",
};

export const TextSecondary = Template.bind({});
TextSecondary.args = {
  variant: "text",
  color: "secondary",
  children: "Text Secondary Button",
};

export const Disabled = Template.bind({});
Disabled.args = {
  variant: "contained",
  color: "primary",
  disabled: true,
  children: "Disabled Button",
};

export const CustomColorAndSize = Template.bind({});
CustomColorAndSize.args = {
  variant: "contained",
  color: "primary",
  size: "large",
  children: "Custom Button",
};
