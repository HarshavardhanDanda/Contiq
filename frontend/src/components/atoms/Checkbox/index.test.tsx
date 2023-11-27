import { render, screen, fireEvent } from "@testing-library/react";
import Checkbox, { CheckboxAtomProps } from ".";
import "@testing-library/jest-dom";

describe("CheckboxAtom", () => {
  const CheckboxAtomdefaultProps: CheckboxAtomProps = {
    label: "Checkbox",
    checked: true,
    disabled: false,
  };
  it("renders the checkbox with the default props", () => {
    render(<Checkbox {...CheckboxAtomdefaultProps} />);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const checkbox = screen.getByLabelText(CheckboxAtomdefaultProps.label!);
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();
    expect(checkbox).not.toBeDisabled();
  });

  it("renders the checkbox with the label", () => {
    const label = "Custom Label";
    render(<Checkbox {...CheckboxAtomdefaultProps} label={label} />);
    const checkbox = screen.getByLabelText(label);
    expect(checkbox).toBeInTheDocument();
  });
  test("handles click events correctly", () => {
    const label = "Custom Label";
    const handleClick = jest.fn();
    const { getByLabelText } = render(
      <Checkbox handleClick={handleClick} label={label} isFileCheckbox/>
    );

    const checkbox = getByLabelText(label);

    fireEvent.click(checkbox);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
