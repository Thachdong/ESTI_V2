import { TextField, TextFieldProps } from "@mui/material";
import clsx from "clsx";

type TProps = TextFieldProps & {
  shrinkLabel?: boolean;
};

export const FormInputBase: React.FC<TProps> = ({
  shrinkLabel = false,
  InputProps,
  inputProps,
  InputLabelProps,
  ...props
}) => {
  const defaultProps: TextFieldProps = {
    ...props,
    fullWidth: true,
    variant: "outlined",
    size: "small",
    value: props.value || "",
  };

  const shrink = shrinkLabel ? {} : { shrink: false };
  
  // const shrink = shrinkLabel ? {shrink: !!props?.value || props?.value === false || props?.value === 0} : { shrink: false };

  const defaultLabelProps = {
    className: clsx(
      "!bg-transparent font-bold uppercase text-[12px] mt-[2px]",
      !props.error && "text-input-label"
    ),
    ...shrink,
    ...InputLabelProps,
  };

  const defaultInputProps = {
    ...InputProps,
    className: clsx("bg-input-bg border-input-border", InputProps?.className),
  };

  const defaultInputTagProps = {
    ...inputProps,
    className: clsx(
      !shrinkLabel && "pl-[40%] text-right text-[14px]",
      inputProps?.className
    ),
  };

  return (
    <TextField
      InputLabelProps={defaultLabelProps}
      InputProps={defaultInputProps}
      inputProps={defaultInputTagProps}
      {...defaultProps}
    />
  );
};
