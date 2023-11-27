import { Auth0Button, Auth0ButtonProps } from ".";
import { Meta, StoryFn } from "@storybook/react";
import googleLogo from "../../../../public/assets/images/google logo.svg";

const meta: Meta = {
  title: "atoms/Auth0Button",
  component: Auth0Button,
};
export default meta;
const Template: StoryFn<Auth0ButtonProps> = (args) => <Auth0Button {...args} />;

export const AuthButton = Template.bind({});
AuthButton.args = {
  text: "Continue with google",
  src: googleLogo,
  alt: "google-logo",
  width: "356px",
};
