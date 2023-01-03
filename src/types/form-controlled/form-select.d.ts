import {
  TextFieldProps,
  SelectProps,
  FormControlProps,
  InputLabelProps,
  AutocompleteProps,
} from "@mui/material";
import { ReactNode } from "react";
import { TControllerProps } from "~types/react-hook-form";

type TAutocompleteProps = Partial<
  AutocompleteProps<any, boolean, boolean, boolean | undefined>
> & {
  label: string;
  options: any[];
  getOptionLabel?: (option: any) => string;
  onChange?: (val: any | any[]) => void;
  valueKey?: string;
  callback?: (option: any) => void;
};

type TAutocomplete = TAutocompleteProps & {
  controlProps: TControllerProps;
};

type TAutocompleteAsync = Omit<TAutocompleteProps, "options"> & {
  controlProps: TControllerProps;
  fetcher: (params: any) => Promise<TBaseResponse<TPaginationResponse<any>>>;
  fetcherParams?: object;
  defaultOptions?: any[];
  labelKey?:string;
}

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
  helperText?: string | Element;
  defaultOption?: object[];
};

type TFromSelectAsync = TFormSelectAsyncBase & {
  controlProps: TControllerProps;
};
