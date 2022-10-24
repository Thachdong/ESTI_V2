import { TextFieldProps } from "@mui/material";
import { Control, RegisterOptions } from "react-hook-form";

type TFormSelectBase = {
  options: any[];
  label: string;
  selectShape?: {
    labelKey: string;
    valueKey: string;
  };
  inputProps?: TextFieldProps;
  callback?: (option: any) => void;
};

type TFormSelect = {
  controlProps: TControllerProps;
  baseProps: TFormSelectBase;
};
