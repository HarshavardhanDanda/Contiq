import { Button, ButtonProps } from "@mui/material";
import React from "react";

export interface ButtonComponentProps extends ButtonProps {
  children: string|React.ReactNode;
}

const ButtonComponent: React.FC<ButtonComponentProps> = (props) => {
  const { children, variant, ...rest } = props;

  return (
    <Button variant={variant} {...rest}>
      {children}
    </Button>
  );
};

export default ButtonComponent;
