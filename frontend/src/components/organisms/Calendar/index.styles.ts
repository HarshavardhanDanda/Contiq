import theme from "../../../theme/theme";

export const datePickerStyles = {
  background: theme.palette.grey[400],
  color: theme.palette.textColor.white,
  ".MuiPickersCalendarHeader-root": {
    display: "flex",
    alignItems: "center",
    justifyItems: "space-around",
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    paddingBottom: "8px",
  },
  ".MuiDateCalendar-root": {
    height: "306px",
  },
  ".MuiPickersCalendarHeader-label": {
    textAlign: "center",
    color: theme.palette.textColor.white,
    fontFamily: "Manrope-Regular",
    fontSize: "14px",
    fontWeight: "600",
    lineHeight: "22px",
    marginLeft: "280px",
    marginTop: "-10px",
    position: "absolute",
    width: "180px !important",
  },
  ".MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.MuiPickersCalendarHeader-switchViewIcon":
    {
      color: theme.palette.grey[400],
    },
  ".MuiDayCalendar-header": {
    paddingTop: "-4px",
  },
  ".MuiButtonBase-root.MuiPickersDay-root": {
    color: theme.palette.textColor.white,
    fontFamily: "Manrope-Regular",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "22px",
    "&:hover": {
      borderRadius: "2px",
      backgroundColor: theme.palette.grey[300],
      overflow: "hidden",
      width: "32px",
      height: "32px",
    },
  },
  ".MuiPickersArrowSwitcher-root": {
    display: "inline-flex",
  },
  ".MuiPickersArrowSwitcher-spacer": {
    width: "250px",
  },
  ".MuiPickersCalendarHeader-root:first-child": {
    order: 0,
    paddingRight: "20px",
    paddingLeft: "20px",
  },
  ".css-kg9q0s-MuiButtonBase-root-MuiIconButton-root-MuiPickersArrowSwitcher-button":
    {
      color: theme.palette.grey[100],
    },
  ".MuiButtonBase-root.Mui-disabled.MuiPickersDay-root.Mui-disabled.MuiPickersDay-dayWithMargin":
    {
      color: theme.palette.textColor.lowEmphasis,
    },
  ".css-rhmlg1-MuiTypography-root-MuiDayCalendar-weekDayLabel": {
    color: theme.palette.textColor.highEmphasis,
    fontFamily: "Manrope-Regular",
    fontWeight: 700,
    fontSize: "12px",
    lineHeight: "22px",
  },
  ".MuiSvgIcon-root.MuiSvgIcon-fontSizeInherit": {
    color: theme.palette.grey[100],
  },
  ".MuiPickersFadeTransitionGroup-root": {
    display: "flex",
    position: "relative",
    justifyContent: "space-evenly",
  },
  ".MuiPickersCalendarHeader-switchViewIcon": {
    position: "absolute",
    zIndex: 3,
    left: "200px",
    color: "white",
  },
  ".MuiPickersCalendarHeader-labelContainer": {
    overflow: "visible",
  },
  ".MuiDayCalendar-header > span": {
    color: theme.palette.textColor.highEmphasis,
  },
  ".MuiButtonBase-root-MuiPickersDay-root:not(.Mui-selected)": {
    borderRadius: "4px",
    borderColor: theme.palette.grey[300],
    backgroundColor: theme.palette.grey[300],
    height: "306px",
  },
  ".MuiButtonBase-root.MuiPickersDay-root.MuiPickersDay-dayWithMargin.MuiPickersDay-dayOutsideMonth.css-1n438t2-MuiButtonBase-root-MuiPickersDay-root":
    {
      color: theme.palette.textColor.lowEmphasis,
      fontFamily: "Manrope-Regular",
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "22px",
    },
};
