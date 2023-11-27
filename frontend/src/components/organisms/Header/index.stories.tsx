import HeaderComponent, { HeaderComponentProps } from ".";
import { type StoryFn } from "@storybook/react";

export default {
  title: "organisms/Header",
  component: HeaderComponent,
};

const Template: StoryFn<HeaderComponentProps> = (
  args: HeaderComponentProps
) => <HeaderComponent {...args} />;

export const Header = Template.bind({});
Header.args = {
  notificationCount: 3
};
