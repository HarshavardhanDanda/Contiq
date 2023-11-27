import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, Popover, Stack } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import ChevronDownIcon from "../../../../public/assets/images/chevronDown.svg";
import ChevronUpIcon from "../../../../public/assets/images/chevronUp.svg";
import CloseIcon from "../../../../public/assets/images/closeGray.svg";
import "dayjs/locale/en";
import dayjs from "dayjs";
import Typography from "../../atoms/Typography";
import { IconComponent } from "../../atoms/Icon";
import theme from "../../../theme/theme";
import { datePickerStyles } from "./index.styles";
import { useCalendar, useDateHandling } from "./hook";
import {
  dayOfWeekFormatterHandler,
  formatDate,
} from "../../../utils/functions";

export interface CalendarProps {
  label: string;
  date: string;
  setDatelabel: React.Dispatch<React.SetStateAction<string>>;
  minDate?: string;
  maxDate?: string;
  handleSelectedEmptyStartDate?: boolean;
  handleSelectedEmptyEndDate?: boolean;
}

const Calendar = ({
  label,
  date,
  setDatelabel,
  handleSelectedEmptyEndDate,
  handleSelectedEmptyStartDate,
  minDate,
  maxDate,
}: CalendarProps) => {
  const {
    anchorEl,
    openDatePicker,
    datePickerRef,
    openDatePickerHandler,
    closeDatePickerHandler,
  } = useCalendar();

  const { dateCalendarChangeHandler, handleCloseDatePicker } = useDateHandling(
    setDatelabel,
    closeDatePickerHandler
  );

  const generateEndIcon = () => {
    if (date === label) {
      if (anchorEl !== null && openDatePicker) {
        return (
          <IconComponent
            src={ChevronUpIcon}
            alt="chevron-up"
            style={{cursor:'pointer'}}
          />
        );
      } else {
        return (
          <IconComponent
            src={ChevronDownIcon}
            alt="chevron-down"
          />
        );
      }
    } else {
      return (
        <IconComponent
          src={CloseIcon}
          alt="close-icon"
          onClick={() =>
            handleCloseDatePicker(
              handleSelectedEmptyStartDate,
              handleSelectedEmptyEndDate,
              label
            )
          }
        />
      );
    }
  };

  const id = openDatePicker ? "date-picker-popover" : undefined;
  return (
    <>
      <Box
        ref={datePickerRef}
        data-testid="datepicker-container"
        width={date !== label ? "178px" : "128px"}
        height={"36px"}
        onClick={openDatePickerHandler}
        sx={{
          cursor: "pointer",
          border: `1px solid ${theme.palette.grey[100]}`,
          borderRadius: theme.spacing(1),
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: theme.spacing(3),
          paddingRight: theme.spacing(3),
          ...(date !== label && {
            backgroundColor: theme.palette.primary.primary100,
          }),
        }}
      >
        <Stack
          direction={"row"}
          gap={theme.spacing(2)}
          sx={{
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center"
          }}
        >
          <Typography
            variant="body1"
            color={theme.palette.textColor.black}
            sx={{
              whiteSpace: "nowrap",
            }}
          >
            {date}
          </Typography>
          {generateEndIcon()}
        </Stack>
      </Box>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
        <Popover
          sx={{
            marginTop: "0.7vw",
          }}
          id={id}
          open={openDatePicker}
          anchorEl={anchorEl}
          disableAutoFocus={true}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          onClose={closeDatePickerHandler}
        >
          <DateCalendar
            onChange={dateCalendarChangeHandler}
            disableHighlightToday
            disableFuture
            sx={datePickerStyles}
            showDaysOutsideCurrentMonth
            dayOfWeekFormatter={dayOfWeekFormatterHandler}
            minDate={
              minDate && (dayjs(formatDate(minDate)) as unknown as string)
            }
            maxDate={
              maxDate && (dayjs(formatDate(maxDate)) as unknown as string)
            }
          />
        </Popover>
      </LocalizationProvider>
    </>
  );
};
export default Calendar;
