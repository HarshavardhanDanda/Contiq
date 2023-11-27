import { Avatar, Stack, styled } from "@mui/material";
import TypographyComponent from "../../atoms/Typography";
import theme from "../../../theme/theme";
import { NotificationProps } from "../../organisms/NotificationCard";
import { notificationDateFormat } from "../../../utils/functions";

export interface NotificationMoleculeProps {
  src: string;
  notification: NotificationProps;
}

const StyledStack = styled(Stack)({
  flexDirection: "row",
  gap: `${theme.spacing(3)}`,
  width: "400px",
  minHeight: "66px",
  padding: `${theme.spacing(3)}`,
});

const Notification = ({ src, notification }: NotificationMoleculeProps) => {
  return (
    <StyledStack>
      <Avatar src={src} alt={"avatar"} sx={{ width: "36px", height: "36px" }} />
      <Stack flexDirection={"column"}>
        <Stack
          flexDirection={"row"}
          gap={theme.spacing(1)}
          alignItems={"flex-start"}
        >
          <TypographyComponent
            variant="body2"
            color={theme.palette.textColor.black}
          >
            <span style={{ fontWeight: 600 }}>{notification.userName}</span>
            {notification.type === "request access"
              ? ` request access to ${notification.fileName}`
              : ` has uploaded ${notification.fileName}`}
          </TypographyComponent>
        </Stack>
        <TypographyComponent
          variant={"caption1"}
          color={theme.palette.textColor.mediumEmphasis}
        >
          {notificationDateFormat(notification.createdAt)}
        </TypographyComponent>
      </Stack>
    </StyledStack>
  );
};
export default Notification;
