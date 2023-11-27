import React, { useEffect, useState } from "react";
import { LinearProgress, styled } from "@mui/material";
import theme from "../../../theme/theme";

export interface ProgressBarProps {
  width: string;
  height: string;
}

const CustomLinearProgress = styled(LinearProgress)({
  borderRadius: theme.spacing(25)
});

const ProgressBar = ({ width, height }: ProgressBarProps) => {
  const [value, setValue] = useState(0)
  useEffect(() => {
    const interval = 25;

    const updateValue = () => {
      if (value < 100) {
        setValue(value + 1);
      }
    };

    const timeout = setTimeout(updateValue, interval);

    return () => {
      clearTimeout(timeout);
    };
  }, [value]);
  return (
    <CustomLinearProgress
      variant="determinate"
      value={value}
      sx={{
        backgroundColor: theme.palette.structural.background5,
        width: width,
        height: height,
      }}
    />
  );
};

export default ProgressBar;
