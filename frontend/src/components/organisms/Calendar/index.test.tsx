import { render, fireEvent, screen } from "@testing-library/react";
import Calendar from ".";
import "@testing-library/jest-dom";
import { DAYS_OF_WEEK } from "../../../constants";

describe("Calendar component", () => {
  const mockSetDatelabel = jest.fn();
  const currentDate = new Date();
  const monthOptions: Intl.DateTimeFormatOptions = { month: "long" };
  const currentMonth = currentDate.toLocaleString("en-US", monthOptions);
  const currentYear = currentDate.getFullYear();
  test("Calendar component works correctly", () => {
    render(
      <Calendar
        label="Start date"
        date="Start date"
        setDatelabel={mockSetDatelabel}
      />
    );
    const datePickerContainer = screen.getByTestId("datepicker-container");
    expect(datePickerContainer).toBeInTheDocument();

    const chevronDownIcon = screen.getByAltText("chevron-down");
    fireEvent.click(chevronDownIcon);
    expect(screen.getByText(`${currentMonth} ${currentYear}`))
      .toBeInTheDocument;

    const dateCells = screen.getAllByRole("gridcell");
    fireEvent.click(dateCells[9]);
  });

  test("Calendar component works correctly", () => {
    render(
      <Calendar
        label="Start date"
        date="Start date"
        setDatelabel={mockSetDatelabel}
      />
    );
    const datePickerContainer = screen.getByTestId("datepicker-container");
    expect(datePickerContainer).toBeInTheDocument();

    const chevronDownIcon = screen.getByAltText("chevron-down");
    fireEvent.click(chevronDownIcon);
    expect(screen.getByText(`${currentMonth} ${currentYear}`))
      .toBeInTheDocument;
  });

  test("Should render element", () => {
    render(
      <Calendar
        setDatelabel={mockSetDatelabel}
        label={"Start Date"}
        date={"Start Date"}
        handleSelectedEmptyStartDate={true}
        handleSelectedEmptyEndDate={true}
        minDate={"2023-10-25 11:48:00"}
      />
    );

    const downIcon = screen.getByAltText("chevron-down");
    fireEvent.click(downIcon);
    const date = screen.getAllByText("2")[0];
    expect(date).toBeDefined();
    fireEvent.click(date);

    const data = DAYS_OF_WEEK.get("MO");
    expect(data).toBeDefined;
  });
  test("should render the selected a date from the calendar", () => {
    const setDateMock = jest.fn();
    render(
      <Calendar
        label="Select Date"
        date="2023-10-10"
        setDatelabel={mockSetDatelabel}
        maxDate={"2023-10-25 11:48:00"}
        handleSelectedEmptyEndDate={true}
      />
    );
    const expandMoreIcon = screen.getByAltText("close-icon");
    fireEvent.click(expandMoreIcon);
    const dates = screen.queryAllByText((content) => {
      return (
        content.includes("10") &&
        content.includes("October") &&
        content.includes("2023")
      );
    });
    dates.forEach((date) => console.log(date.textContent));
    if (dates.length > 0) {
      fireEvent.click(dates[0]);
      expect(setDateMock).toHaveBeenCalledWith("2023-10-10");
    }
  });
  test("should render the selected a date from the calendar", () => {
    const setDateMock = jest.fn();
    render(
      <Calendar
        label="Select Date"
        date="2023-10-10"
        setDatelabel={mockSetDatelabel}
        maxDate={"2023-10-25 11:48:00"}
        handleSelectedEmptyStartDate={false}
        handleSelectedEmptyEndDate={false}
      />
    );
    const expandMoreIcon = screen.getByAltText("close-icon");
    fireEvent.click(expandMoreIcon);
    const dates = screen.queryAllByText((content) => {
      return (
        content.includes("10") &&
        content.includes("October") &&
        content.includes("2023")
      );
    });
    dates.forEach((date) => console.log(date.textContent));
    if (dates.length > 0) {
      fireEvent.click(dates[0]);
      expect(setDateMock).toHaveBeenCalledWith("2023-10-10");
    }
  });
});
