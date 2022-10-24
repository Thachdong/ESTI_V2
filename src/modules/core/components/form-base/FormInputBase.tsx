import { TextField, TextFieldProps } from "@mui/material";

type TProps = {
  inputProps?: TextFieldProps;
};

export const FormInputBase: React.FC<TProps> = ({ inputProps }) => (
  <TextField fullWidth variant="outlined" {...inputProps} />
);
