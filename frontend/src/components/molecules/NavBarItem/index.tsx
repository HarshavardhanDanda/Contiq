import React from "react";
import { Box, styled } from "@mui/material";
import { IconComponent, IconProps } from "../../atoms/Icon/index";
import theme from "../../../theme/theme";
import TypographyComponent, {
  TypographyComponentProps,
} from "../../atoms/Typography/index";

export interface NavBarItemProps {
  iconSrc: IconProps;
  isActive?: boolean;
  text: TypographyComponentProps;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const NavBarItemContainer = styled(Box)({
  width: "82px",
  height: "76px",
  flexShrink: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: theme.palette.grey[500],
  color: theme.palette.grey[400],
});

const NavBarItem: React.FC<NavBarItemProps> = ({
  iconSrc,
  isActive,
  text,
  onClick,
}) => {
  return (
    <NavBarItemContainer
      onClick={onClick}
      style={{
        color: isActive
          ? theme.palette.textColor.white
          : theme.palette.grey[200],
        background: isActive
          ? theme.palette.grey[400]
          : theme.palette.grey[500],
        cursor:
          text.children === "Files" || text.children === "Home"
            ? "pointer"
            : "default",
      }}
    >
      <IconComponent
        src={iconSrc.src}
        alt="nav-item-icon"
        width="24px"
        height="24px"
        style={iconSrc.style}
      />
      <TypographyComponent variant={text.variant}>
        {text.children}
      </TypographyComponent>
    </NavBarItemContainer>
  );
};

export default NavBarItem;
