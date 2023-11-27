import { IconComponent, IconProps } from ".";
import { Meta, StoryFn } from "@storybook/react";
import search from "../../../../public/assets/images/search.svg";
import emptyStatus from "../../../../public/assets/images/empty state.svg";

const meta: Meta = {
  title: "atoms/Icon",
  component: IconComponent,
};
export default meta;
const Template: StoryFn<IconProps> = (args) => <IconComponent {...args} />;

export const SearchIcon = Template.bind({});
SearchIcon.args = {
  src: search,
  alt: "search-icon",
  height: "24px",
  width: "24px",
};
export const EmptyStatusImage = Template.bind({});
EmptyStatusImage.args = {
  src: emptyStatus,
  alt: "empty-status-icon",
  height: "300px",
  width: "300px",
};
