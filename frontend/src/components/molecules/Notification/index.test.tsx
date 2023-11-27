import { render, screen } from "@testing-library/react";
import profile from "../../../../public/assets/images/avatar.svg";
import Notification from ".";
import "@testing-library/jest-dom";
import { NotificationProps } from "../../organisms/NotificationCard";

const notificationData: NotificationProps = {
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
};

describe("Notification", () => {
  test("renders Notification component with provided props", () => {
    render(<Notification src={profile} notification={notificationData} />);

    expect(screen.getByText("harsha")).toBeInTheDocument();
    expect(screen.getByText("has uploaded file")).toBeInTheDocument();
  });

   test("should render request access type card", () => {
     render(<Notification src={profile} notification={{...notificationData, type: "request access"}} />);

     expect(screen.getByText("harsha")).toBeInTheDocument();
     expect(screen.getByText("request access to file")).toBeInTheDocument();
   });
});
