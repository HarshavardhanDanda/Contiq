import { Meta, StoryFn } from "@storybook/react";
import ProgressBar, { ProgressBarProps } from ".";

export default {
  title: "atoms/ProgressBar",
  component: ProgressBar,
} as Meta;

const Template: StoryFn<ProgressBarProps> = (args) => <ProgressBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  width: "346px",
  height: "8px",
  value: 50,
};
