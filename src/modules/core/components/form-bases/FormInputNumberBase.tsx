import { TextField, TextFieldProps } from "@mui/material";
import clsx from "clsx";
import NumberFormat, {
  NumberFormatProps,
  NumberFormatValues,
  SourceInfo,
} from "react-number-format";

type TProps = NumberFormatProps<TextFieldProps> & {
  shrinkLabel?: boolean;
};

export const FormInputNumberBase: React.FC<TProps> = (props) => {
  // EXTRACT PROPS
  const { onChange, shrinkLabel = false, InputLabelProps, InputProps, inputProps, ...restProps } = props;

  // METHODS
  const handleValueChange = (values: NumberFormatValues, _: SourceInfo) => {
    const floatValue = values?.floatValue as any;

    onChange?.(floatValue || "");
  };

  // DEFAULT PROPS
  const defaultProps: NumberFormatProps<TextFieldProps> = {
    allowLeadingZeros: false,
    allowNegative: false,
    thousandSeparator: true,
    decimalSeparator: ".",
    decimalScale: 0,
    size: "small",
    ...restProps,
  };

  const shrink = shrinkLabel ? {} : {shrink: false}

  const defaultLabelProps = {
    className: "!bg-transparent text-input-label font-medium",
    ...shrink,
    ...InputLabelProps,
  }

  const defaultInputProps = {
    ...InputProps,
    className: clsx("bg-input-bg border-input-border", InputProps?.className),
  }

  const defaultInputTagProps = {
    ...inputProps,
    className: clsx(!shrinkLabel && "pl-[40%] text-right", inputProps?.className),
  }

  return (
    <NumberFormat
      customInput={TextField}
      variant="outlined"
      onValueChange={handleValueChange}
      InputLabelProps={defaultLabelProps}
      InputProps={defaultInputProps}
      inputProps={defaultInputTagProps}
      {...defaultProps}
    />
  );
};
