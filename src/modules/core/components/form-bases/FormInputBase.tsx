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
      props.disabled && "disable-form-input",
      props?.inputProps?.className
    ),
  };

  return <TextField {...defaultProps} inputProps={inputProps} />;
};
