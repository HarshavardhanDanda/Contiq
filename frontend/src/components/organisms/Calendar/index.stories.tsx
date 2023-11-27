import React, { useState } from "react";
import { StoryFn, Meta } from "@storybook/react";
import Calendar, { CalendarProps } from "./"; 

export default {
  title: "organisms/Calendar",
  component: Calendar,
} as Meta;

const Template: StoryFn<CalendarProps> = (args) => {
  const [datelabel, setDatelabel] = useState<string>("Start date");
  return (
    <Calendar
      label={args.label}
      date={datelabel}
      setDatelabel={setDatelabel}
      
    />
  );
};

export const Datepicker = Template.bind({});
Datepicker.args = {
  label: "Start date",
};
