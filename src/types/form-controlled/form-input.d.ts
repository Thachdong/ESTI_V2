import { Control, RegisterOptions } from "react-hook-form";
import { TextFieldProps } from "@mui/material";
import { TControllerProps } from "~types/react-hook-form";

type TFormInputBaseProps = {
  baseProps?: TextFieldProps;
};

type TFormInputProps = TFormInputBaseProps & {
  controlProps: TControllerProps;
};