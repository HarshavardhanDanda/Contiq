import React from "react";
import RadioButton, { RadioButtonProps } from ".";
import { action } from "@storybook/addon-actions";
import { StoryFn } from "@storybook/react";

export default {
  title: "atoms/RadioButton",
  component: RadioButton,
};

const Template: StoryFn<RadioButtonProps> = (args) => <RadioButton {...args} />;

export const Default = Template.bind({});

export const Checked = Template.bind({});
Checked.args = {
  label: "Radio Option 2",
  value: "option2",
  isChecked: true,
  onChange: action("Radio Option 2 clicked"),
};

export const Unchecked = Template.bind({});
Unchecked.args = {
  label: "Radio Option 3",
  value: "option3",
  isChecked: false,
  onChange: action("Radio Option 3 clicked"),
};
