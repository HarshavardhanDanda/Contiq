import React from "react";
import { StoryFn } from "@storybook/react";
import FileSelect, { FileSelectProps } from ".";

export default {
  title: "molecules/FileSelect",
  component: FileSelect,
};

const Template: StoryFn<FileSelectProps> = (args: FileSelectProps) => (
  <FileSelect {...args} />
);

export const FileCheckbox = Template.bind({});
FileCheckbox.args = {
  fileName: "My Folder",
  onSelect: (e: React.ChangeEvent<HTMLInputElement>) =>
    console.log("Selected:", e.target.checked),
};
