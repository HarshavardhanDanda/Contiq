import React from "react";
import { Box, CheckboxProps, FormControlLabel } from "@mui/material";
import MuiCheckbox from "@mui/material/Checkbox";
import theme from "../../../theme/theme";

export interface CheckboxAtomProps extends CheckboxProps {
  label?: string | React.ReactNode;
  width?: string;
  height?: string;
  // eslint-disable-next-line no-unused-vars
  handleClick?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isFileCheckbox?: boolean
}

const styledCheckbox = {
  color: theme.palette.textColor.white,
  "&.Mui-checked": {
    color: theme.palette.textColor.white,
  }
};

const Checkbox = ({
  handleClick,
  label,
  width,
  height,
  isFileCheckbox,
  ...rest
}: CheckboxAtomProps) => {
  return (
    <Box sx={{ display: "flex",alignContent:"center"}}>
      <FormControlLabel
        label={label}
        labelPlacement="end"
        control={
          <MuiCheckbox
            {...rest}
            onChange={(e) => {
              handleClick?.(e);
            }}
            sx={{
              width: width,
              height: height,
              ...(isFileCheckbox ? styledCheckbox : { marginRight: `${theme.spacing(2)}`}),
            }}
            name="checkbox-atom"
          />
        }
      />
    </Box>
  );
};
export default Checkbox;
