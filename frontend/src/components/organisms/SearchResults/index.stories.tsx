import { type StoryFn } from "@storybook/react";
import SearchResults, { SearchResultProps } from ".";

export default {
  title: "organisms/SearchResults",
  component: SearchResults,
};

const Template: StoryFn<SearchResultProps> = (args: SearchResultProps) => (
  <SearchResults {...args} />
);
export const Default = Template.bind({});
Default.args = {
  fileData: [
    {
      id: 1,
      name: "Company  agreement .pdf",
    },
    {
      id: 2,
      name: "Software  agreement 2.pdf",
    },
    {
      id: 3,
      name: "Software  agreement 3.pdf",
    },
    {
      id: 4,
      name: "Software  agreement 3.pdf",
    },
  ],
};
