import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NavBarItem, { NavBarItemProps } from ".";
import theme from "../../../theme/theme";
import homeIcon from "../../../../public/assets/images/home-active.svg";
import "@testing-library/jest-dom";

describe("NavBarItem", () => {
  const defaultProps: NavBarItemProps = {
    iconSrc: { src: homeIcon, alt: "test-icon" },
    text: { children: "Test Item", variant: "caption1" },
    isActive: false,
    onClick: jest.fn(),
  };

  it("renders without crashing", () => {
    const { getByAltText } = render(<NavBarItem {...defaultProps} />);
    const icon = getByAltText("nav-item-icon");
    expect(icon).toBeInTheDocument();
  });

  it("renders the provided text", () => {
    const { getByText } = render(<NavBarItem {...defaultProps} />);
    const text = getByText("Test Item");
    expect(text).toBeInTheDocument();
  });

  it("reflects isActive prop in its styling", () => {
    const { rerender, getByText } = render(
      <NavBarItem {...defaultProps} isActive={true} />
    );
    const activeItem = getByText("Test Item").parentElement;
    expect(activeItem).toHaveStyle(`color: ${theme.palette.textColor.white}`);
    expect(activeItem).toHaveStyle(`background: ${theme.palette.grey[400]}`);

    rerender(<NavBarItem {...defaultProps} isActive={false} />);
    const inactiveItem = getByText("Test Item").parentElement;
    expect(inactiveItem).toHaveStyle(`color: ${theme.palette.grey[200]}`);
    expect(inactiveItem).toHaveStyle(`background: ${theme.palette.grey[500]}`);
  });

  it("triggers onClick prop when clicked", () => {
    const { getByText } = render(<NavBarItem {...defaultProps} />);
    fireEvent.click(getByText("Test Item"));
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
});
