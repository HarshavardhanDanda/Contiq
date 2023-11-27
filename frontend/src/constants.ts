import theme from "./theme/theme";

export const title = "Notifications";

import avatar from "../public/assets/images/avatar.svg";
import user2 from "../public/assets/images/user 2.svg";
import homeIconInActive from "../public/assets/images/home.svg";
import calendarIcon from "../public/assets/images/calendar-inactive.svg";
import fileIcon from "../public/assets/images/file-inactive.svg";
import metricsIcon from "../public/assets/images/metrics-inactive.svg";
import peopleIcon from "../public/assets/images/people-inactive.svg";
import storeIcon from "../public/assets/images/store-inactive.svg";
import fileCardImg from '../public/assets/images/filecard-img.svg';
import profileCardImg from "../public/assets/images/file-card.svg";
import digitalTransformImg from "../public/assets/images/pdfImage.svg";
import { NavBarProps } from "./components/organisms/NavBar";

export const LOCAL_MOCKSERVER_URL = "https://bc127ms.spcluster.tk";
export const LOCAL_API_GATEWAY_URL = "http://localhost:9000/api";

export const DEPLOYED_API_GATEWAY_URL = "https://bc127be.spcluster.tk/api";
export const notificationData = [
  {
    id: 1,
    src: avatar,
    alt: "user-avatar",
    userName: "Amit",
    message: "has uploaded company agreement.pdf",
    time: "20 June 10:30 AM",
  },
  {
    id: 2,
    src: avatar,
    alt: "user-avatar",
    userName: "Amit",
    message: "has uploaded company profile.pdf",
    time: "10 June 10:50 PM",
  },
  {
    id: 3,
    src: avatar,
    alt: "user-avatar",
    userName: "Amit",
    message: "has uploaded company agreement.pdf",
    time: "20 June 10:30 AM",
  },
  {
    id: 4,
    src: user2,
    alt: "user-avatar",
    userName: "John",
    message: "request access to User agreement.pdf",
    time: "03 June 09:30 AM",
  },
  {
    id: 5,
    src: avatar,
    alt: "user-avatar",
    userName: "Amit",
    message: "has uploaded company agreement.pdf",
    time: "02 June 12:30 PM",
  },
  {
    id: 6,
    src: avatar,
    alt: "user-avatar",
    userName: "Amit",
    message: "has deleted company agreement.pdf",
    time: "01 June 09:30 AM",
  },
  {
    id: 7,
    src: avatar,
    alt: "user-avatar",
    userName: "Amit",
    message: "has deleted company agreement.pdf",
    time: "01 June 09:30 AM",
  },
  {
    id: 8,
    src: avatar,
    alt: "user-avatar",
    userName: "Amit",
    message: "has deleted company agreement.pdf",
    time: "01 June 09:30 AM",
  },
];
export const resetPassword = "Reset your password";
export const send = "Send";
export const emailText = "Email";
export const emailPlaceholder = "john@example.com";
export const verificationMail =
  "The verification mail will be sent to the mailbox please check it.";
export const notValidEmail = "Please enter a valid email address";
export const passwordReset = "Password reset";
export const resetSuccess = "Your password has been successfully reset. Click below to login magically.";
export const continueText = "Continue";
export const PASSWORD_ERROR = "Password should be atleast 8 characters long with 1 uppercase, 1 lowercase and 1 special character";
export const CONFIRM_PASSWORD_ERROR = "Password and confirm password must be same";
export const createNewPassword = "Create new password";
export const newPassword = "New password";
export const confirmPasswordText = "Confirm new password";
export const passwordPlaceholder = "**************";
export const resetButtonText = "Reset Password";
export const changePassword = "Enter new password below to change your password";

export const PDF_LICENSE = "kL3Hn4gvrCtCWg2ZI3yH";
export const NAVIGATE_FILE = './file';
export const PDF_STYLE = `.document-content-container,
.LeftPanel,
.content {
  background-color: ${theme.palette.textColor.white};
}
.left-panel-container {
  width: 80% !important
}
#Thumbnail-container {
  height: ${theme.spacing(62)} !important;
  width:  ${theme.spacing(49)} !important;
  border-radius:  ${theme.spacing(0.5)};
  padding:  ${theme.spacing(1)},  ${theme.spacing(2)}
}
.Thumbnail .page-label {
  display: none;
}
.left-panel-container {
  width: 100%;
  padding: 0 !important
}
.Thumbnail.active .container .page-image {
  border:  ${theme.spacing(0.5)} solid ${theme.palette.primary.main};
}
::-webkit-scrollbar{
  width: ${theme.spacing(3.5)};
}
::-webkit-scrollbar-track{
  background-color: ${theme.palette.structural.background3};
  width: ${theme.spacing(3.5)};
  border-radius: ${theme.spacing(3)};
}
::-webkit-scrollbar-thumb {
  background-color: ${theme.palette.grey[100]};
  border-radius: ${theme.spacing(4)};
  border:  ${theme.spacing(1)} solid ${theme.palette.structural.background3};
  height: ${theme.spacing(49)};
  width: ${theme.spacing(1.5)};
}
  `;
export const DEFAULT_ZOOM = 1.0;
export const MIN_ZOOM = 0.1;
export const MAX_ZOOM = 1.5

const DISABLED_ELEMENTS = [
  "ribbons",
  "toolsHeader",
  "header",
  "leftPanelTabs",
  "thumbnailsSizeSlider",
  "leftPanelResizeBar",
  "contextMenuPopup",
  "textPopup",
  "pageNavOverlay",
  "searchPanel",
];

export const WEBVIEWER_CONFIG = {
  path: "/webviewer/lib",
  licenseKey: "URkQX8UIDN8BLJGHpRf1",
  disabledElements: DISABLED_ELEMENTS,
};

export const SIGNUP="Sign Up";
export const NAME="Name";
export const EMAILID="Email ID";
export const PASSWORD="Password";
export const CREATE_ACCOUNT="Create account";
export const OR="OR";
export const CONTINUE_WITH_GOOGLE="Continue with google";
export const ALREDY_HAVE_AN_ACCOUNT="Already have an account?";
export const SIGNIN="Sign In";
export const NAME_ERROR="Name cannot start with numbers";
export const namePlaceholder="John Cena";
export const CREATE_PASSWORD="Create a password";
export const REMEMBER_ME = "Remember me";
export const FORGOT_PASSWORD = "Forgot password?";
export const NOT_HAVE_AN_ACCOUNT = "Doesn’t have an account?";
export const DROPFILES = "Drop your files here";
export const CHOOSE_FILE_BUTTON = "Choose files";
export const DROP_FROM_DRIVE =
  "Drag media here to upload or connect an account";
export const UPLOAD_FILES_BUTTON = "Upload Files";
export const DAYS_OF_WEEK = new Map([
  ['Su', 'SUN'],
  ['Mo', 'MON'],
  ['Tu', 'TUE'],
  ['We', 'WED'],
  ['Th', 'THU'],
  ['Fr', 'FRI'],
  ['Sa', 'SAT']
]);



export const FILE_TYPE_ITEMS={
  item1: "PDF",
  item2: "PPT",
  item3: "IMAGE",
};
export const FILE_TYPE="File type"
export const PUBLISHED_SETTING="Publish setting"
export const PUBLISHED_SETTING_ITEMS={
  item1:"Published by me",
  item2:"Published by Sales team",
  item3:"Published by others"
}
export const START_DATE="Start date";
export const END_DATE="End date";
export const MOST_RELEVANT="Most relevant";
export const OTHER_DOCS="Other documents";
export const SEARCH_RESULTS = "Search results";
export const CONTIQ = "CONTIQ";
export const SYNC = "Sync";
export const BACK = "Back";
export const DRIVE_SYNC = "Closing this window will not interrupt your sync";
export const SYNC_IN_PROGRESS = "Sync in progress";
export const CHOOSE_FOLDERS = "Choose the folders to sync with contiq";
export const SCROLLBAR_STYLE = {
  "&::-webkit-scrollbar": {
    width: theme.spacing(1),
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: theme.palette.textColor.black,
    width: theme.spacing(2),
    borderRadius: theme.spacing(1.5),
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: theme.spacing(2),
    border: `${theme.spacing(1)} solid ${theme.palette.structural.background3}`,
    height: theme.spacing(5),
    width: theme.spacing(1),
  }}

  export const DRIVE_API_KEY = "AIzaSyB7jo5lL40MwhbR0-ImXo8sz8H0DwHOTZg";
  export const DRIVE_CLIENT_ID =
    "432177468871-jj0nv7guviknbp0tm55r9e5paju2bsmv.apps.googleusercontent.com";
  export const DRIVE_DISCOVERY_DOCS =
    "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest";
  export const DRIVE_SCOPE = "https://www.googleapis.com/auth/drive.readonly";
  export const REPLACE_EXISTING_FILE =
    " already exists in this location. Do you want to replace the existing file with a new version?";

export const UPLOADS = "Uploads";
export const CLOUD_STORAGE = "Cloud storage";
export const UPLOADING = "Uploading 1/1";
export const USER_NAME="Ryan Mathew";
export const EMAIL="ryan01@gmail.com";
export const navBarItems: NavBarProps[] = [
  {
    id: 1,
    iconSrc: { src: homeIconInActive, alt: "home-icon" },
    text: {
      children: "Home",
      variant: "caption1",
    }
  },
  {
    id: 2,
    iconSrc: { src: storeIcon, alt: "store-icon-inactive" },
    text: {
      children: "Office",
      variant: "caption1",
    }
  },
  {
    id: 3,
    iconSrc: { src: peopleIcon, alt: "people-icon" },
    text: {
      children: "People",
      variant: "caption1",
    }
  },
  {
    id: 4,
    iconSrc: { src: calendarIcon, alt: "calendar-icon-inactive" },
    text: {
      children: "Calendar",
      variant: "caption1",
    }
  },
  {
    id: 5,
    iconSrc: { src: fileIcon, alt: "files-icon-inactive" },
    text: {
      children: "Files",
      variant: "caption1",
    }
  },
  {
    id: 6,
    iconSrc: { src: metricsIcon, alt: "metrics-icon-inactive" },
    text: {
      children: "Metrics",
      variant: "caption1",
    }
  },
];

export const SCROLLBAR_STYLE_2 = {
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
};

export const fileImaesArray = [fileCardImg, profileCardImg, digitalTransformImg];
