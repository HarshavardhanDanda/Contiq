import { type StoryFn, Meta } from "@storybook/react";
import Notification from ".";
import { NotificationProps } from "../../organisms/NotificationCard";

export default {
  title: "molecules/Notification",
  component: Notification,
  argTypes: {
    user: {
      control: { type: "text" },
    },
    userDetails: {
      control: { type: "text" },
    },
    timeDetails: {
      control: { type: "text" },
    }
  },
} as Meta;

const Template: StoryFn<NotificationProps> = () => (
  <Notification
    src={""}
    notification={{
      id: 1,
      file_id: 1,
      user_id: 5,
      is_read: true,
      uploaded_by: 1,
      created_at: "2023-10-25 11:00:00",
      updated_at: "2023-10-25 11:40:00",
      type: "upload",
      userName: "harsha",
      fileName: "file",
    }}
  />
);

export const Notification1 = Template.bind({});

