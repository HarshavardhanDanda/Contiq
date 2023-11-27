import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import NoFileInfo, { NoFileInfoProps } from "./index"; // Adjust the path accordingly
import nofile from "../../../../public/assets/images/empty state.svg";
import theme from "../../../theme/theme";
export default {
  title: "molecules/NoFileInfo",
  component: NoFileInfo,
} as Meta;

const Template: StoryFn<NoFileInfoProps> = (args) => <NoFileInfo {...args} />;

export const Default = Template.bind({});
Default.args = {
  iconSrc: nofile,
  iconAlt: "No File Default",
  title: {
    variant: "subtitle1",
    children: "No files availabe",
    color: theme.palette.textColor.black,
  },
  subtitle: {
    variant: "body2",
    children: "Start by syncing your cloud storage to contiq",
    color: theme.palette.textColor.lowEmphasis,
  },
  style: {
    textAlign: "center",
  },
};
