import { render, fireEvent } from "@testing-library/react";
import RadioButton from ".";
import "@testing-library/jest-dom";

describe("RadioButton Component", () => {
  const onChange = jest.fn();
  const isChecked = false;
  const commonProps = {
    label: "Radio Option",
    value: "option3",
    isChecked: isChecked,
    onChange: onChange,
  };

  it("should render with the label", () => {
    const { getByText } = render(<RadioButton {...commonProps} />);
    const labelElement = getByText("Radio Option");
    expect(labelElement).toBeInTheDocument();
  });

  it("should render with the provided label and be unchecked", () => {
    const { getByText, getByTestId } = render(
      <RadioButton {...commonProps} isChecked={!isChecked} />
    );
    const labelElement = getByText("Radio Option");
    const radioElement = getByTestId("radio-button");
    expect(labelElement).toBeInTheDocument();
    expect(radioElement).toBeInTheDocument();
    expect(radioElement).not.toBeChecked();
  });

  it("should call the onChange function when clicked", () => {
    const { getByTestId } = render(<RadioButton {...commonProps} />);

    const radioElement = getByTestId("radio-button");
    fireEvent.click(radioElement);
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
