import { FormHelperText, OutlinedInput, SxProps, styled } from "@mui/material";
import React, { ReactNode } from "react";
import theme from "../../../theme/theme";

export interface InputFieldProps {
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  errorMessage?: string;
  width: string;
  value?: string;
  placeHolder?: string;
  color?: string;
  type?: string;
  height?: string;
  label?:string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line no-unused-vars
  onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
  // eslint-disable-next-line no-unused-vars
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
  sx?: SxProps
}

const StyledOutlinedInput = styled(OutlinedInput)(
  ({ width, height }: InputFieldProps) => ({
    width: width,
    height: height,
    borderRadius: theme.spacing(1),
    border: `1px solid ${theme.palette.grey[100]}`,
    color: `${theme.palette.textColor.mediumEmphasis}`,
  })
);

const InputField = ({
  endAdornment,
  startAdornment,
  errorMessage,
  placeHolder,
  color,
  value,
  onChange,
  onFocus,
  onBlur,
  label,
  ...props
}: InputFieldProps) => {
  return (
    <>
      <StyledOutlinedInput
        endAdornment={endAdornment}
        startAdornment={startAdornment}
        inputProps={{
          style: {
            color: color,
            font: `${theme.typography.body1}`
          },
        }}
        value={value}
        placeholder={placeHolder}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        label={label}
        {...props}
      />
      {errorMessage && (
        <FormHelperText
          sx={{
            color: "red",
            marginLeft: "0.5rem",
            font: `${theme.typography.body1}`,
          }}
        >
          {errorMessage}
        </FormHelperText>
      )}
    </>
  );
};

export default InputField;
