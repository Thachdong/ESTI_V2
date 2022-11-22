import { TextFieldProps } from "@mui/material";
import { TControllerProps } from "~types/react-hook-form";

type TFormSelectBase = TextFieldProps & {
  options: any[];
  label: string;
  selectShape?: {
    labelKey: string;
    valueKey: string;
  };
  callback?: (option: any) => void;
};

type TFormSelect = TFormSelectBase & {
  controlProps: TControllerProps;
};
