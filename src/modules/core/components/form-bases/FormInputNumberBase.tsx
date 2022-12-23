import { TextField, TextFieldProps } from "@mui/material";
import clsx from "clsx";
import NumberFormat, {
  NumberFormatProps,
  NumberFormatValues,
  SourceInfo,
} from "react-number-format";

export const FormInputNumberBase: React.FC<
  NumberFormatProps<TextFieldProps>
> = (props) => {
  const { onChange, ...restProps } = props;

  const defaultProps: NumberFormatProps<TextFieldProps> = {
    allowLeadingZeros: false,
    allowNegative: false,
    thousandSeparator: true,
    decimalSeparator: ".",
    decimalScale: 0,
    size: "small",
    ...restProps,
  };

  const handleValueChange = (values: NumberFormatValues, _: SourceInfo) => {
    const floatValue = values?.floatValue as any;

    onChange?.(floatValue || "");
  };

  return (
    <NumberFormat
      customInput={TextField}
      variant="outlined"
      className={clsx(props.disabled && "bg-[#f0f0f0]", props.className)}
      onValueChange={handleValueChange}
      {...defaultProps}
    />
  );
};
