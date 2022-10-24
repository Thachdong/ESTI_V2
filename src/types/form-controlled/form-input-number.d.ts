import { TControllerProps } from "~types/react-hook-form";
import { TextFieldProps } from "@mui/material";
import { NumberFormatProps } from "react-number-format";

type TFormInputNumberBaseProps = {
  baseProps?: NumberFormatProps<TextFieldProps>;
};

type TFormInputNumberProps = TFormInputNumberBaseProps & {
  controlProps: TControllerProps;
};