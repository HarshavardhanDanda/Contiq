import { StoryFn, Meta } from "@storybook/react";
import { DividerComponent } from ".";

export default {
  title: "Atoms/Divider",
  component: DividerComponent,
  argTypes: {
    text: {
      control: { type: "text" },
    },
  },
} as Meta<typeof DividerComponent>;
const template: StoryFn<typeof DividerComponent> = (args) => (
  <DividerComponent {...args} />
);

export const DividerWithText = template.bind({});
DividerWithText.args = {
  text: "OR",
};

export const Divider = template.bind({});
