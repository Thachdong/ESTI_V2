import { TextField, TextFieldProps } from "@mui/material";
import clsx from "clsx";

type TProps = TextFieldProps & {
  shrinkLabel?: boolean;
};

export const FormInputBase: React.FC<TProps> = ({
  shrinkLabel = false,
  InputProps,
  inputProps,
  ...props
}) => {
  const defaultProps: TextFieldProps = {
    fullWidth: true,
    variant: "outlined",
    size: "small",
    value: props.value || "",
    ...props,
  };

  const defaultLabelProps = {
    shrink: shrinkLabel,
    className: "!bg-transparent",
    ...props?.InputLabelProps,
  }

  const defaultInputProps = {
    ...InputProps,
    className: clsx("bg-input-bg border-input-border", InputProps?.className),
  }

  const defaultInputTagProps = {
    ...inputProps,
    className: clsx("pl-[40%] text-right", inputProps?.className),
  }

  return (
    <TextField
      InputLabelProps={defaultLabelProps}
      InputProps={defaultInputProps}
      inputProps={defaultInputTagProps}
      {...defaultProps}
    />
  );
};
