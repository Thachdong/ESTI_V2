import { TextField, TextFieldProps } from "@mui/material";
import clsx from "clsx";

export const FormInputBase: React.FC<TextFieldProps> = (props) => {
  const defaultProps: TextFieldProps = {
    fullWidth: true,
    variant: "outlined",
    size: "small",
    value: props.value || "",
    ...props,
  };

  const inputProps = {
    ...defaultProps.inputProps,
    className: clsx(
      props.disabled &&
        "disable-form-input !bg-[#dfe2e5] !rounded !border !border-[#dfe2e5]",
      props?.inputProps?.className
    ),
  };

  const forceTriggerLabelShrink = !!props?.value
    ? {
        InputLabelProps: {
          ...props?.InputLabelProps,
          shrink: true,
        },
      }
    : {};

  return (
    <TextField
      {...defaultProps}
      {...forceTriggerLabelShrink}
      inputProps={inputProps}
      className="h-[40px] bg-[#f6f9fb] !border !border-[#fcfdfd]"
    />
  );
};
