import { TextField } from "@mui/material";
import { TFormInputBaseProps } from "~types/form-controlled/form-input";

export const FormInputBase: React.FC<TFormInputBaseProps> = ({ baseProps }) => (
  <TextField fullWidth variant="outlined" {...baseProps} />
);
