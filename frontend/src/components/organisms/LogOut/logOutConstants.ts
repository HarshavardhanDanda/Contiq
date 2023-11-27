import user from "../../../../public/assets/images/user.svg";
import settings from "../../../../public/assets/images/logout-settings.svg";
import logoutIcon from "../../../../public/assets/images/logout.svg";

export const USER = "John Ross";
export const USER_ID = "IDJR00292";

export const logoutItems = [
  {
    id:1,
    src: user,
    alt: "user-icon",
    text: "Profile",
  },
  {
    id:2,
    src: settings,
    alt: "settings-icon",
    text: "Settings",
  },
  {
    id:3,
    src: logoutIcon,
    alt: "logout-icon",
    text: "Logout",
  },
];
