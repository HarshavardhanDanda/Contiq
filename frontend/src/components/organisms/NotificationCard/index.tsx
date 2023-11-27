import { Box } from "@mui/material";
import { styled } from "@mui/system";
import closeIcon from "../../../../public/assets/images/close-icon.svg";
import Loader from "../../../../public/assets/images/loading_bars.gif";
import theme from "../../../theme/theme";
import { IconComponent } from "../../atoms/Icon";
import Typography from "../../atoms/Typography";
import Notification from "../../molecules/Notification";
import { title } from "../../../constants";
import { useNotificationCard } from "./hooks";
import avatar from "../../../../public/assets/images/avatar.svg";

const StyledNotificationBox = styled(Box)({
  width: "400px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  border: `1px solid ${theme.palette.grey[100]}`,
  borderRadius: "6px",
  alignSelf: "stretch",
  backgroundColor: theme.palette.textColor.white,
});
const StyledTitleBox = styled(Box)({
  display: "flex",
  padding: theme.spacing(3),
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: theme.palette.textColor.white,
  alignSelf: "stretch",
  borderBottom: `1px solid ${theme.palette.grey[100]}`,
  borderRadius: theme.spacing(1, 1, 0, 0),
  marginTop: theme.spacing(1.25),
  marginBottom: theme.spacing(0.5),
});
const StyledGif = styled(IconComponent)({
  margin: "70px",
});
const StyledNotifications = styled(Box)({
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
  overflowX: "hidden",
  width: "calc(400px - 5px)",
  maxHeight: "386px",

  "&::-webkit-scrollbar": {
    width: "6px",
    background: theme.palette.structural.background3,
  },
  "&::-webkit-scrollbar-thumb": {
    background: theme.palette.grey[100],
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: theme.palette.grey[100],
  },
  "&::-webkit-scrollbar-track": {
    background: "none",
    height: "6px",
  },
  "&::-webkit-scrollbar-thumb:vertical": {
    background: theme.palette.grey[100],
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb:vertical:hover": {
    background: theme.palette.grey[100],
  },
});

export interface NotificationProps {
  id: number;
  file_id: number;
  user_id: number;
  is_read: boolean;
  uploadedBy: number;
  createdAt: string;
  updatedAt: string;
  type: string;
  fileName: string;
  userName: string;
}

export interface NotificationCardProps {
  handleClose?: () => void;
}
export const NotificationCard = ({ handleClose }: NotificationCardProps) => {
  const { isLoading, notifications } = useNotificationCard();

  return (
    <StyledNotificationBox data-testid="notification-row">
      <StyledTitleBox>
        <Typography variant="h3" color={theme.palette.textColor.black}>
          {title}
        </Typography>
        <IconComponent
          src={closeIcon}
          alt={"close-icon"}
          onClick={handleClose}
          style={{ cursor: "pointer" }}
        />
      </StyledTitleBox>

      <StyledNotifications
        sx={isLoading ? { height: "386px" } : { maxHeight: "386px" }}
      >
        {isLoading ? (
          <StyledGif src={Loader} alt="loader-gif" />
        ) : (
          notifications.map((notification: NotificationProps) => (
            <Box
              data-testid="divider"
              key={notification.id}
              sx={{ borderBottom: `0.5px solid rgb(191, 196, 200, 0.5)` }}
            >
              <Notification src={avatar} notification={notification} />
            </Box>
          ))
        )}
      </StyledNotifications>
    </StyledNotificationBox>
  );
};
