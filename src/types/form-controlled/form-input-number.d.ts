import { TControllerProps } from "~types/react-hook-form";
import { TextFieldProps } from "@mui/material";
import { NumberFormatProps } from "react-number-format";

type TFormInputNumberProps = NumberFormatProps<TextFieldProps> & {
  controlProps: TControllerProps;
  shrinkLabel?: boolean;
};