import { TextField, TextFieldProps } from "@mui/material";
import NumberFormat, { NumberFormatProps } from "react-number-format";

export const FormInputNumberBase: React.FC<NumberFormatProps<TextFieldProps>> = (props) => {
  const defaultProps: NumberFormatProps<TextFieldProps> = {
    allowLeadingZeros: false,
    required: true,
    allowNegative: false,
    thousandSeparator: true,
    decimalSeparator: ".",
    decimalScale: 0,
    ...props,
  };

  return (
    <NumberFormat
      {...defaultProps}
      customInput={TextField}
      variant="outlined"
    />
  );
};
