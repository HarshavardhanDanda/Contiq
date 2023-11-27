import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import FileSelectionOrganism, { FileSelectionOrganismProps } from ".";

export default {
  title: "Organisms/FIleSelection",
  component: FileSelectionOrganism,
} as Meta;

const Template: StoryFn<FileSelectionOrganismProps> = (args) => (
  <FileSelectionOrganism {...args} />
);

export const Default = Template.bind({});
Default.args = {
  files: [{ filename: "File1" }, { filename: "File2" }, { filename: "File3" }],
};
