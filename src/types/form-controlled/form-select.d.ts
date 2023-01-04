import {
  TextFieldProps,
  SelectProps,
  FormControlProps,
  InputLabelProps,
  AutocompleteProps,
  TextFieldProps
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
  inputProps?: TextFieldProps;
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