import { FormControlLabel, Radio } from "@mui/material";
import React from "react";
import TypographyComponent from "../Typography";
import theme from "../../../theme/theme";

export interface RadioButtonProps {
  label: string;
  isChecked: boolean;
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const RadioButton = (props: RadioButtonProps) => {
  const { label, isChecked, value, onChange } = props;
  const labelColor = isChecked
    ? theme.palette.textColor.white
    : theme.palette.textColor.highEmphasis;
  const radioColor = isChecked
    ? theme.palette.textColor.white
    : theme.palette.textColor.mediumEmphasis;
  return (
    <FormControlLabel
      data-testid="radio-button"
      label={
        <TypographyComponent
          variant={isChecked ? "body1" : "body2"}
          color={labelColor}
        >
          {label}
        </TypographyComponent>
      }
      control={
        <Radio
          style={{ color: radioColor, paddingRight: theme.spacing(1) }}
          checked={isChecked}
          onChange={onChange}
          value={value}
        />
      }
    />
  );
};

export default RadioButton;
