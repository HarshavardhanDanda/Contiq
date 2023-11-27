import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import UploadFromLocalOrganism from "./index";

export default {
  title: "Organisms/UploadFiles",
  component: UploadFromLocalOrganism,
} as Meta;

const Template: StoryFn = (args) => (
  <UploadFromLocalOrganism
    isOpen={false}
    onClose={function (): void {
      throw new Error("Function not implemented.");
    }}
    {...args}
  />
);

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  onClose: () => console.log("Close clicked"),
};
