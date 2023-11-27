import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import SnackBar, { SnackBarProps } from ".";
import completeIcon from "../../../../public/assets/images/complete.svg";
import closeIcon from "../../../../public/assets/images/close.svg";
import theme from "../../../theme/theme";

export default {
  title: "Molecules/SnackBar",
  component: SnackBar,
} as Meta;

const Template: StoryFn<SnackBarProps> = (args) => <SnackBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: {
    variant: "body1",
    children: "Text copied",
    style: {
      color: theme.palette.textColor.white,
    },
  },
  startIconSrc: completeIcon,
  endIconSrc: closeIcon,
};
