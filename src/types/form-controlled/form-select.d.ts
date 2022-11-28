import { TextFieldProps, AutocompleteProps } from "@mui/material";
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

type TFormSelectAsyncBase = AutocompleteProps & {
  getListApi?: (params?: any) => any;
  label?: string;
  selectShape?: {
    labelKey: string;
    valueKey: string;
  };
  callback?: (option: any) => void;
};

type TFromSelectAsync = TFormSelectAsyncBase & {
  controlProps: TControllerProps;
};
