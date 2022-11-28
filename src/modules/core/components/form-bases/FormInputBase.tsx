import { TextField, TextFieldProps } from "@mui/material";

export const FormInputBase: React.FC<TextFieldProps> = (props) => {

  const defaultProps: TextFieldProps = {
    fullWidth: true,
    variant: "outlined",
    size: "small",
    ...props,
  };

  return <TextField {...defaultProps} />;
};
