import { Moment } from "moment";
import { DateTimePickerProps } from "@mui/x-date-pickers";
import { TControllerProps } from "~types/react-hook-form";
import { TextFieldProps } from "@mui/material";
import React from "react";

type TFormDatepickerBase = DateTimePickerProps & {
  renderInput?: (
    props: TextFieldProps
  ) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  renderInputProps?: TextFieldProps;
};

type TFormDatepicker = DateTimePickerProps & {
  controlProps: TControllerProps;
};
