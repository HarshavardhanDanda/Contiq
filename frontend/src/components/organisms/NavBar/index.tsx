import { Box, styled } from "@mui/material";
import NavBarItem from "../../molecules/NavBarItem";
import theme from "../../../theme/theme";
import { TypographyComponentProps } from "../../atoms/Typography";
import settingIcon from "../../../../public/assets/images/settings.svg";
import { IconProps } from "../../atoms/Icon";
import { navBarItems } from "../../../constants";
import { useNavBarHooks } from "./hook";

export interface NavBarProps {
  id: number;
  iconSrc: IconProps;
  text: TypographyComponentProps;
  onClick?: () => void;
}

export interface NavBarComponentProps {
  activeItem: string
}

const NavBarItemsContainer = styled(Box)({
  background: theme.palette.grey[500],
});

const NavBarContainer = styled(Box)({
  background: theme.palette.grey[500],
  width: "82px",
  height: "calc(100vh - 60px)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

const SettingsItem = styled(NavBarItem)({});

const NavBar = ({ activeItem }: NavBarComponentProps) => {
  const { handleIcon, handleItemClick } = useNavBarHooks(activeItem);
  return (
    <NavBarContainer>
      <NavBarItemsContainer>
        {navBarItems.map((item) => (
          <NavBarItem
            key={item.id}
            isActive={item.text.children === activeItem}
            iconSrc={handleIcon(item.iconSrc)}
            text={item.text}
            onClick={() => handleItemClick(item.iconSrc)}
          />
        ))}
      </NavBarItemsContainer>

      <SettingsItem
        iconSrc={{ src: settingIcon, alt: "setting-icon" }}
        text={{ children: "", variant: "caption1" }}
      />
    </NavBarContainer>
  );
};

export default NavBar;
