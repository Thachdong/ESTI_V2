import { Control, RegisterOptions } from "react-hook-form";
import { TextFieldProps } from "@mui/material";
import { TControllerProps } from "~types/react-hook-form";

type TFormInputCreatableProps = TextFieldProps & {
  controlProps: TControllerProps;
  shrinkLabel?: boolean;
};