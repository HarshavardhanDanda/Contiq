import { Meta, StoryFn } from "@storybook/react";
import Tabs, { TabsProps } from ".";
import TypographyComponent from "../../atoms/Typography";
import theme from "../../../theme/theme";
import { Box } from "@mui/material";

const meta: Meta = {
  title: "molecules/Tabs",
  component: Tabs,
};

export default meta;
const Template: StoryFn<TabsProps> = (args) => (
  <Box bgcolor={theme.palette.grey[400]} p={2}>
  <Tabs {...args} />
</Box>
);


export const FileTabs = Template.bind({});

FileTabs.args = {
  tabs: [
    {
      id:0,
      label: "All files",
      content: (
        <TypographyComponent
          color={theme.palette.textColor.black}
          variant="body1"
        >
          Files
        </TypographyComponent>
      ),
    },
    {
      id:1,
      label: "Slides",
      content: (
        <TypographyComponent
          color={theme.palette.textColor.black}
          variant="body1"
        >
          Slides
        </TypographyComponent>
      ),
      disabled: true,
    },
    {
      id:2,
      label: "Docs",
      content: (
        <TypographyComponent
          color={theme.palette.textColor.black}
          variant="body1"
        >
          Docs
        </TypographyComponent>
      ),
      disabled: true,
    },
  ],
  tabWidth: "85px",
  activeTabColor:theme.palette.primary.primary500,
  nonActiveTabColor:theme.palette.textColor.mediumEmphasis,
  activeLabelColor: theme.palette.textColor.white,
};

export const UploadTabs = Template.bind({});

UploadTabs.args = {
  tabs: [
    {
      id:0,
      label: "Uploads",
      content: (
        <TypographyComponent
          color={theme.palette.textColor.white}
          variant="body1"
        >
          Upload local
        </TypographyComponent>
      ),
    },
    {
      id:1,
      label: "Cloud Storage",
      content: (
        <TypographyComponent
          color={theme.palette.textColor.white}
          variant="body1"
        >
          Cloud Storage
        </TypographyComponent>
      ),
    },
  ],
  tabWidth: "363px",
  activeTabColor:theme.palette.primary.primary500,
  nonActiveTabColor:theme.palette.textColor.mediumEmphasis,
  activeLabelColor:theme.palette.textColor.white
};
