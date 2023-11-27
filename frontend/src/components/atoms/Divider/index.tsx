import React from "react";
import theme from "../../../theme/theme";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";

export interface DividerProps {
  text?: string;
  color?: string;
}

export const divStyle = {
  display: "flex",
  alignItems: "center",
  color: theme.palette.textColor.mediumEmphasis,
};

export const DividerComponent = (props: DividerProps) => {
  const styleDivider = {
    backgroundColor: props.color ?? theme.palette.grey[100],
    height: "1px",
  };

  return (
    <div style={divStyle}>
      <div style={{ flexGrow: 1 }}>
        <Divider sx={styleDivider} />
      </div>
      {props.text && (
        <Typography variant="caption1" sx={{ m: "0px 19px" }}>
          {props.text}
        </Typography>
      )}
      <div style={{ flexGrow: 1 }}>
        <Divider sx={styleDivider} />
      </div>
    </div>
  );
};
