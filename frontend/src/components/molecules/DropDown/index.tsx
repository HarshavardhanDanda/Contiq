import { FormControl, MenuItem, Select, SelectChangeEvent, styled } from "@mui/material";
import TypographyComponent from "../../atoms/Typography";
import { useState } from "react";
import theme from "../../../theme/theme";
import { DividerComponent } from "../../atoms/Divider";
import { IconComponent } from "../../atoms/Icon";
import UpArrow from "../../../../public/assets/images/UpArrow.svg";
import close from "../../../../public/assets/images/dropdownClose.svg";

interface MenuItemProp {
  [key: string]: string;
}

export interface DropDownProps {
  menuItems: MenuItemProp;
  placeholder: string;
  label: string;
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
  handleChange: (event: SelectChangeEvent<any>) => void;
  handleClear?: () => void;
  value: string;
}

const StyledSelect = styled(Select)(({ theme, value }) => ({
  height: theme.spacing(9),
  padding: "0px 5px 0px 0px",
  display: "flex",
  alignItems: "center",
  width: "fit-content",
  borderRadius: theme.spacing(1),
  border:`1px solid ${theme.palette.grey[100]}`,
  backgroundColor: value
    ? theme.palette.primary.primary100
    : theme.palette.textColor.white,
}));

const DropDown = (props: DropDownProps) => {
  const { menuItems, placeholder, label, handleChange, handleClear, value } = props;
  const [isOpen, setIsOpen] = useState(false);
  const handleDropDown = () => {
    setIsOpen(!isOpen);
  };
  const menuItemStyles = {
    backgroundColor: theme.palette.grey[400],
    width: "250px",
    marginTop: "7px",
  };

  const renderIcon = () => {
    if (value !== "") {
      return (
        <IconComponent
          data-testId="closeDropDown"
          src={close}
          alt={"Close"}
          style={{ cursor: "pointer" }}
          onClick={handleClear}
        />
      );
    } else {
      return (
        <IconComponent
          src={UpArrow}
          alt={"Up"}
          style={{
            transform: isOpen ? "rotate(0deg)" : "rotate(180deg)",
            cursor: "pointer",
          }}
        />
      );
    }
  };

  return (
    <FormControl>
      <StyledSelect
        value={value}
        onChange={handleChange}
        displayEmpty
        variant="outlined"
        MenuProps={{ PaperProps: { style: menuItemStyles },   anchorOrigin: { vertical: "bottom", horizontal: "left" },
        transformOrigin: { vertical: "top", horizontal: "left" }, }}
        IconComponent={() => renderIcon()}
        onOpen={handleDropDown}
        onClose={handleDropDown}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        renderValue={(value: any) => (
          <TypographyComponent
            variant="body1"
            color={theme.palette.textColor.black}
          >
            {value !== "" ? value : placeholder}
          </TypographyComponent>
        )}
      >
        <MenuItem style={{ pointerEvents: "none" }}>
          <TypographyComponent
            variant="body1"
            color={theme.palette.textColor.white}
          >
            {label}
          </TypographyComponent>
        </MenuItem>
        <DividerComponent color={theme.palette.textColor.lowEmphasis} />
        {Object.entries(menuItems).map(([key, val]) => {
          return (
            <MenuItem key={key} value={val}>
              <TypographyComponent
                variant="caption1"
                color={theme.palette.textColor.white}
              >
                {val}
              </TypographyComponent>
            </MenuItem>
          );
        })}
      </StyledSelect>
    </FormControl>
  );
};

export default DropDown;
