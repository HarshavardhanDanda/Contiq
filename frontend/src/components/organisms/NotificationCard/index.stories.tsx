import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { NotificationCard } from ".";

export default {
  title: "organisms/NotificationCard",
  component: NotificationCard,
} as Meta;

const Template: StoryFn = () => <NotificationCard />;

export const Notification_Card = Template.bind({});
