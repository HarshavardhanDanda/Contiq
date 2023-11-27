import React, { useState } from "react";
import { Tabs as MuiTabs, Tab as MuiTab } from "@mui/material";
import TypographyComponent from "../../atoms/Typography";
import theme from "../../../theme/theme";


export interface TabData {
  id:number;
  label: string;
  content?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabData[];
  tabWidth: string;
  activeTabColor:string;
  nonActiveTabColor?:string;
  activeLabelColor?:string;
  tabBorder?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, tabWidth,activeTabColor,nonActiveTabColor,activeLabelColor, tabBorder}) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <>
      <MuiTabs
        value={activeTab}
        variant="scrollable"
        sx={{borderBottom: tabBorder ?? `1px solid ${theme.palette.structural.background3}`}}
      >
        {tabs.map((tab) => (
          <MuiTab
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            label={
              <TypographyComponent
                variant="body1"
                color={activeTab === tab.id ? activeLabelColor : "none"}
              >
                {tab.label}
              </TypographyComponent>
            }
            style={{
              minWidth: tabWidth,
              color: activeTab === tab.id ? activeTabColor : nonActiveTabColor,
            }}
            disabled={tab.disabled}
            disableRipple
          />
        ))}
      </MuiTabs>
      <div>{tabs[activeTab].content}</div>
    </>
  );
};

export default Tabs;
