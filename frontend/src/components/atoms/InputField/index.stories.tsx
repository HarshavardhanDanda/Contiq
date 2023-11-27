import { Meta, StoryFn } from "@storybook/react";
import InputField, { InputFieldProps } from "./index";
import theme from "../../../theme/theme";

const meta: Meta = {
  title: "atoms/InputField",
  component: InputField,
  argTypes: {
    placeholder: {
      control: { type: "text" },
    },
    width: {
      control: {
        type: "text",
      },
    },
    onChange: { action: "Onchange" },
  },
};

export default meta;
const Templete: StoryFn<InputFieldProps> = (args) => <InputField {...args} />;

export const Name = Templete.bind({});
Name.args = {
  placeHolder: "John Cena",
  width: "356px",
  color: theme.palette.textColor.black,
  height: "48px"
};

export const Email = Templete.bind({});
Email.args = {
  placeHolder: "john@gmail.com",
  width: "356px",
  color: theme.palette.textColor.black,
  height: "48px"
};

export const Password = Templete.bind({});
Password.args = {
  type: "text",
  placeHolder: "Create Password",
  width: "356px",
  height: "48px",
  color: theme.palette.textColor.black
};
