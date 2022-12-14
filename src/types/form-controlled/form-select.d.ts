import {
  TextFieldProps,
  SelectProps,
  FormControlProps,
  InputLabelProps,
} from "@mui/material";
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

type TFormSelectAsyncBase = SelectProps & {
  fetcher: (params: any) => Promise<TBaseResponse<TPaginationResponse<any>>>;
  fetcherParams?: object;
  queryKey?: string;
  selectShape?: {
    valueKey: string;
    labelKey: string;
  };
  callback?: (option: any) => void;
  formControlProps?: FormControlProps;
  inputLabelProps?: InputLabelProps;
};

type TFromSelectAsync = TFormSelectAsyncBase & {
  controlProps: TControllerProps;
};
