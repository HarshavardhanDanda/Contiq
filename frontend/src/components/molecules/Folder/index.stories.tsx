import { Folder, FolderProps } from ".";
import { Meta, StoryFn } from "@storybook/react";
import fileDrive from "../../../../public/assets/images/file drive.svg";
import arrowIcon from "../../../../public/assets/images/chevron.svg";

const meta: Meta = {
  title: "molecules/Folder",
  component: Folder,
};
export default meta;
const Template: StoryFn<FolderProps> = (args) => <Folder {...args} />;

export const ZemosoDecks = Template.bind({});
ZemosoDecks.args = {
  text: "Zemoso decks",
  startIcon: fileDrive,
  startAlt: "file-drive-icon",
  endIcon: arrowIcon,
  endAlt: "arrow-icon",
};
export const SampleData = Template.bind({});
SampleData.args = {
  text: "Sample data",
  startIcon: fileDrive,
  startAlt: "file-drive-icon",
  endIcon: arrowIcon,
  endAlt: "arrow-icon",
};
