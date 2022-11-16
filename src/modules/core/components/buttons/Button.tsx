import { LoadingButton } from "@mui/lab";
import { ButtonProps } from "@mui/material";
import { ReactNode } from "react";

type TProps = {
  buttonProps: ButtonProps & any;
  // USE BUTTONPROPS INSTEAD OF LOADINGBUTTONPROPS,
  // LOADINGBUTTONPROPS CAN LEADING TO BUGS "next build stuck on "Checking validity of types..."
  // https://github.com/vercel/next.js/issues/31994
  children: ReactNode;
};

export const Button: React.FC<TProps> = ({ buttonProps, children }) => {
  return (
    <LoadingButton fullWidth variant="contained" {...buttonProps}>
      {children}
    </LoadingButton>
  );
};
