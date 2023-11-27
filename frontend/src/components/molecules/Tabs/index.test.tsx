import React from "react";
import { render, fireEvent,screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import Tabs from ".";


describe("Tabs component", () => {
  const tabs = [
    { id:1,label: "Tab 1", content: "Content 1" },
    { id:2,label: "Tab 2", content: "Content 2", disabled: true },
    { id:3,label: "Tab 3", content: "Content 3"},
  ];

  test("renders the Tabs component with active and non-active tabs", () => {
     render(
      <Tabs
        tabs={tabs}
        tabWidth="100px"
        activeTabColor="blue"
        nonActiveTabColor="black"
        activeLabelColor="red"
      />
    );
    const tabelement1=screen.getByText("Tab 1");
    expect(tabelement1).toBeInTheDocument();

  });

  test("switches between tabs when a tab is clicked", () => {
    render(
      <Tabs
        tabs={tabs}
        tabWidth="100px"
        activeTabColor="blue"
        nonActiveTabColor="balck"
        activeLabelColor="red"
      />
    );

    const tab1 = screen.getByText("Tab 1");
    const tab2 = screen.getByText("Tab 2");

    fireEvent.click(tab2);
     
     const setActiveTab = jest.fn();
    
     React.useState = jest.fn(() => [0, setActiveTab]);
 
     fireEvent.click(tab1);


    expect(tab1).toHaveStyle("color: red");
    expect(tab2).not.toHaveStyle("color: red");
  });
});


