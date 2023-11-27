import { useRef, useState } from "react";

export const useCalendar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  const openDatePickerHandler = () => {
    setAnchorEl(datePickerRef.current);
    setOpenDatePicker(true);
  };

  const closeDatePickerHandler = () => {
    setAnchorEl(null);
    setOpenDatePicker(false);
  };

  return {
    anchorEl,
    openDatePicker,
    datePickerRef,
    openDatePickerHandler,
    closeDatePickerHandler,
  };
};

export function useDateHandling(
  setDateLabel: React.Dispatch<React.SetStateAction<string>>,
  closeDatePickerHandler: () => void
) {
  const dateCalendarChangeHandler = (val: string | null) => {
    const date = val === "" ? undefined : new Date(val as string);
    if (date) {
      const month = new Intl.DateTimeFormat("en", {
        month: "long",
      }).format(date);
      setDateLabel(`${date.getDate()} ${month} ${date.getFullYear()}`);
    }
    closeDatePickerHandler();
  };

  const handleCloseDatePicker = (
    handleSelectedEmptyStartDate: boolean | undefined,
    handleSelectedEmptyEndDate: boolean | undefined,
    label: string
  ) => {
    closeDatePickerHandler();
    if (handleSelectedEmptyStartDate || handleSelectedEmptyEndDate) {
      dateCalendarChangeHandler("");
    }
    setDateLabel(label);
  };

  return { dateCalendarChangeHandler, handleCloseDatePicker };
}
