import PdfViewer, { PdfViewerProps } from ".";
import { type StoryFn } from "@storybook/react";

export default {
  title: "organisms/PdfViewer",
  component: PdfViewer,
};

const Template: StoryFn<PdfViewerProps> = (args: PdfViewerProps) => (
  <PdfViewer {...args} />
);

export const PdfViewerWithSearch = Template.bind({});
PdfViewerWithSearch.args = {
  searchQuery: "function",
};

export const PdfViewerWithoutSearch = Template.bind({});
