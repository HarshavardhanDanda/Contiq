import { PaginationBar, PaginationBarProps } from ".";
import { Meta, StoryFn } from "@storybook/react";

const meta: Meta = {
  title: "molecules/PaginationBar",
  component: PaginationBar,
};
export default meta;
const Template: StoryFn<PaginationBarProps> = (args) => (
  <PaginationBar {...args} />
);

export const PaginationFooter = Template.bind({});
PaginationFooter.args = {
  totalPages: 5,
  pageNumber: 1,
  zoomPercent: 85,
};
