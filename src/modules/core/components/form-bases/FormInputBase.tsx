import { TextField, TextFieldProps } from "@mui/material";
import clsx from "clsx";

export const FormInputBase: React.FC<TextFieldProps> = (props) => {
  const defaultProps: TextFieldProps = {
    fullWidth: true,
    variant: "outlined",
    size: "small",
    ...props,
  };

  const inputProps = {
    ...defaultProps.inputProps,
    className: clsx(
      props.disabled && "bg-[#f0f0f0]",
      props?.inputProps?.className
    ),
  };

  return <TextField {...defaultProps} inputProps={inputProps} />;
};
