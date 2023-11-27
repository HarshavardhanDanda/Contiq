import React from "react";
import { StoryFn } from "@storybook/react";
import DropDown, { DropDownProps } from ".";

export default {
  title: "molecules/DropDown",
  component: DropDown,
  argTypes: {
    menuItems: { control: "object" },
  },
};

const Template: StoryFn<DropDownProps> = (args: DropDownProps) => (
  <DropDown {...args} />
);

export const FileType = Template.bind({});
FileType.args = {
  menuItems: {
    item1: "PDF",
    item2: "PPT",
    item3: "IMAGE",
  },
  placeholder: "File type",
  label: "File type",
  value: "",
  handleChange: (e) => {console.log(e)},
  handleClear: () => {console.log("cleared")}
};

export const PublishSetting = Template.bind({});
PublishSetting.args = {
  menuItems: {
    item1: "Published by me",
    item2: "Published by Sales team",
    item3: "Published by others",
  },
  placeholder: "Publish Setting",
  label: "Published By",
  value: "Published by me",
  handleChange: (e) => {
    console.log(e);
  },
  handleClear: () => {
    console.log("cleared");
  },
};