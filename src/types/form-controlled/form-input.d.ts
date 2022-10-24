import { Control, RegisterOptions } from "react-hook-form";
import { TextFieldProps } from "@mui/material";

type TFormInputProps = {
  name: string;
  control: Control<any, any>;
  rules?: RegisterOptions;
  inputProps?: TextFieldProps;
}