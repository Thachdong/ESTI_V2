import { TextField, TextFieldProps } from "@mui/material";
import NumberFormat, { NumberFormatProps } from "react-number-format";
import { TFormInputNumberBaseProps } from "~types/form-controlled/form-input-number";

export const FormInputNumberBase: React.FC<TFormInputNumberBaseProps> = ({ baseProps }) => {
  const defaultProps: NumberFormatProps<TextFieldProps> = {
    allowLeadingZeros: false,
    required: true,
    allowNegative: false,
    thousandSeparator: true,
    decimalSeparator: ".",
    decimalScale: 0,
    ...baseProps,
  };

  return (
    <NumberFormat
      {...defaultProps}
      customInput={TextField}
      variant="outlined"
    />
  );
};
