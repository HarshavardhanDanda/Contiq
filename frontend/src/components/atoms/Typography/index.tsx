import { Typography, type TypographyProps } from "@mui/material";
import React from "react";

export interface TypographyComponentProps extends TypographyProps {
  children: string | React.ReactNode;
}
function TypographyComponent(props: Readonly<TypographyComponentProps>) {
  const { variant, children, ...rest } = props;
  return (
    <Typography variant={variant} {...rest}>
      {children}
    </Typography>
  );
}

export default TypographyComponent;
