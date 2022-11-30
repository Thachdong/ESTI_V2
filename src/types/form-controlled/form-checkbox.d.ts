import { CheckboxProps } from "@mui/material";
import { TControllerProps, FormControlLabelProps } from "~types/react-hook-form";

type TFormCheckbox = CheckboxProps & {
  label: string;
  controlProps: TControllerProps;
  labelProps?: FormControlLabelProps
};
