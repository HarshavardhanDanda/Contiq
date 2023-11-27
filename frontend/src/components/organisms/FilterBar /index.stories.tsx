import React, { useState } from "react";
import { type StoryFn, Meta } from "@storybook/react";
import { Box, SelectChangeEvent } from "@mui/material";
import FilterBar, { FilterBarProps } from ".";

export default {
  title: "organisms/FilterBar",
  component: FilterBar,
} as Meta;

const Template: StoryFn<FilterBarProps> = () => {
  const [startDateLabel, setStartDateLabel] = useState<string>("Start date");
  const [endDateLabel, setEndStateLabel] = useState<string>("End date");
  const [fileType, setFileType] = useState<string>("");
  const [publishedType, setPublishedType] = useState<string>("");

  const handleFileChange = (event: SelectChangeEvent<string>) => {
    setFileType(event.target.value);
  };
  const handlePublishedChange = (event: SelectChangeEvent<string>) => {
    setPublishedType(event.target.value);
  };
  return (
    <Box marginTop={"30px"}>
      <FilterBar
        startDate={startDateLabel}
        endDate={endDateLabel}
        setStartDate={setStartDateLabel}
        setEndDate={setEndStateLabel}
        handleFileTypeChange={(event) => {
          handleFileChange(event);
        }}
        handlePublishedTypeChange={(event) => {
          handlePublishedChange(event);
        }}
        fileType={fileType}
        publishedType={publishedType}
      />
    </Box>
  );
};

export const Default = Template.bind({});
