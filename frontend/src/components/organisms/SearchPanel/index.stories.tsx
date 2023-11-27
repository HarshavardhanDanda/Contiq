import { StoryFn, Meta } from "@storybook/react";
import SearchPanel, { SearchPanelProps } from ".";

export default {
  title: "organisms/SearchPanel",
  component: SearchPanel,
} as Meta;

const Template: StoryFn<SearchPanelProps> = (args: SearchPanelProps) => (
  <SearchPanel {...args} />
);

export const Default = Template.bind({});
Default.args = {
  searchQuery: "Search Query",
  docName: "Company Agreement",
  searchResults: [
    [1, "Search Query that needs to be searched for in the whole pdf..."],
    [2, "Search Query along with alot of text"],
    [3, "is to be searched for in Search Query the whole text"],
  ],
  totalPages: 5,
  currentPage: 1
};
