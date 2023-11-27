import { Meta, StoryFn } from "@storybook/react";
import Checkbox, { CheckboxAtomProps } from ".";

export default {
  title: "atoms/Checkbox",
  component: Checkbox,
} as Meta;

const Template: StoryFn<CheckboxAtomProps> = (args) => (
  <Checkbox {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: "Remember me ",
  width: "20px",
  height: "20px",
  disabled: true,
};

