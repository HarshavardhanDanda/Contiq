import React from "react";
import { fireEvent,screen} from "@testing-library/react";
import NavBar from ".";

import "@testing-library/jest-dom";
import { render } from "../../../test-setup";

describe("NavBar", () => {

  it("renders without crashing", () => {
    render(<NavBar activeItem={"Home"} />);
  });

  it("renders all provided items", () => {
    const { getByText } = render(<NavBar activeItem={"Home"}/>);
    expect(getByText("Home")).toBeInTheDocument();
    expect(getByText("Files")).toBeInTheDocument();
  });
  it("should change state on icon click", () => {
    const { getByText } = render(<NavBar activeItem={"Files"}/>);
    expect(getByText("Home")).toBeInTheDocument();
    expect(getByText("Files")).toBeInTheDocument();
    fireEvent.click(getByText("Home"));
    expect(screen.getAllByAltText("nav-item-icon")[0]).toBeInTheDocument;
    fireEvent.click(getByText("Files"));
    expect(screen.getAllByAltText("nav-item-icon")[4]).toBeInTheDocument;
  });
  it("should change state on icon click", () => {
    const { getByText } = render(<NavBar activeItem={"Files"}/>);
    expect(getByText("Home")).toBeInTheDocument();
    expect(getByText("Files")).toBeInTheDocument();
   
    fireEvent.click(getByText("Files"));
    expect(screen.getAllByAltText("nav-item-icon")[4]).toBeInTheDocument;
  });
  it("should return undefined on non functional icon click", () => {
    const { getByText } = render(<NavBar activeItem={"Files"} />);
    expect(getByText("Home")).toBeInTheDocument();
    expect(getByText("Files")).toBeInTheDocument();

    fireEvent.click(getByText("People"));
    expect(screen.getAllByAltText("nav-item-icon")[4]).toBeInTheDocument;
  });
});
