import { Stack, styled } from "@mui/material";
import TypographyComponent from "../../atoms/Typography";
import theme from "../../../theme/theme";
import InputField from "../../atoms/InputField";
import { IconComponent } from "../../atoms/Icon";
import HelpIcon from "../../../../public/assets/images/help.svg";
import NotificationIcon from "../../../../public/assets/images/notification.svg";
import AddUserIcon from "../../../../public/assets/images/addUser.svg";
import AvatarIcon from "../../../../public/assets/images/avatar.svg";
import SearchIcon from "../../../../public/assets/images/searchIcon.svg";
import Avatar from "../../atoms/Avatar";
import SearchResults from "../SearchResults";
import { CONTIQ } from "../../../constants";
import { useHeaderHooks } from "./hooks";
import { NotificationCard } from "../NotificationCard";
import { Logout } from "../LogOut";
import { useNavigate } from "react-router";

const MainContainer = styled(Stack)({
  width: "100%",
  height: theme.spacing(15),
  flexDirection: "row",
  alignItems: "center",
  padding: "0px 20px",
  background: theme.palette.gradient.main,
});

const StyledIconComponent = styled(IconComponent)({
  width: theme.spacing(11),
  height: theme.spacing(11),
  padding: theme.spacing(2.5),
  borderRadius: theme.spacing(2),
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: `rgba(255, 255, 255, 0.2)`,
});

const ContainerWithPopups = styled(Stack)({
  flexDirection: "column",
});

const StyledSearchPopup = styled(Stack)({
  position: "absolute",
  zIndex: "3",
  top: 67,
  right: "14.5%",
  boxShadow: ` 4px 16px 32px 0px rgba(213, 206, 221, 0.70)`,
});

const StyledNotificationPanel = styled(Stack)({
  position: "absolute",
  zIndex: "4",
  top: 70,
  right: "4%",
  boxShadow: ` 4px 16px 32px 0px rgba(213, 206, 221, 0.70)`,
});

const StyledProfilePopup = styled(Stack)({
  position: "absolute",
  zIndex: "5",
  top: 70,
  right: "1.7%",
  boxShadow: ` 4px 16px 32px 0px rgba(213, 206, 221, 0.70)`,
});

const NotificationCount = styled(Stack)({
  position: "absolute",
  backgroundColor: "red",
  borderRadius: "50%",
  zIndex: 7,
  width: "10px",
  height: "10px",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "9px",
  marginLeft: "21px",
});

const HeaderComponent = () => {
  const navigate = useNavigate();
  const {
    searchText,
    handleSearch,
    handleNotifications,
    notificationPanel,
    setNotificationPanel,
    profilePanel,
    handleProfile,
    notificationCount,
    searchResults,
  } = useHeaderHooks();
  return (
    <ContainerWithPopups>
      <MainContainer>
        <TypographyComponent
          variant={"h3"}
          color={theme.palette.textColor.white}
          sx={{ marginRight: theme.spacing(2.5) }}
        >
          {CONTIQ}
        </TypographyComponent>
        <Stack
          direction={"row"}
          gap={theme.spacing(5)}
          alignItems={"center"}
          width={"100%"}
          justifyContent={"flex-end"}
          overflow={"hidden"}
        >
          <InputField
            startAdornment={
              <IconComponent
                src={SearchIcon}
                alt="search"
                width={theme.spacing(6)}
                height={theme.spacing(6)}
                style={{ marginRight: theme.spacing(2) }}
              />
            }
            width={theme.spacing(88)}
            placeHolder="Search"
            color={theme.palette.textColor.white}
            height={theme.spacing(11)}
            sx={{
              backgroundColor: `rgba(255, 255, 255, 0.2)`,
              border: "none",
            }}
            onChange={handleSearch}
          />
          <StyledIconComponent src={HelpIcon} alt="help" />
          <StyledIconComponent src={AddUserIcon} alt="add user" />
          <Stack>
            <StyledIconComponent
              src={NotificationIcon}
              alt="notification"
              onClick={handleNotifications}
              sx={{ cursor: "pointer" }}
            />
            {!!notificationCount && (
              <NotificationCount>
                <TypographyComponent
                  variant="overline2"
                  color={theme.palette.textColor.white}
                >
                  {notificationCount}
                </TypographyComponent>
              </NotificationCount>
            )}
          </Stack>
          <Stack>
            <Avatar
              src={AvatarIcon}
              alt="avatar"
              sx={{
                width: theme.spacing(9),
                height: theme.spacing(9),
                cursor: "pointer",
              }}
              onClick={handleProfile}
            />
          </Stack>
        </Stack>
      </MainContainer>
      {searchText.length >= 1 && (
        <StyledSearchPopup>
          <SearchResults
            fileData={searchResults}
            onSearchResultClick={(id: number) => {
              navigate(`/pdf/${id}?q=${searchText}`);
            }}
          />
        </StyledSearchPopup>
      )}
      {notificationPanel && (
        <StyledNotificationPanel>
          <NotificationCard handleClose={() => setNotificationPanel(false)} />
        </StyledNotificationPanel>
      )}
      {profilePanel && (
        <StyledProfilePopup>
          <Logout />
        </StyledProfilePopup>
      )}
    </ContainerWithPopups>
  );
};

export default HeaderComponent;
