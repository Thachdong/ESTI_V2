import { Moment } from "moment";
import { DateTimePickerProps } from "@mui/x-date-pickers";
import { TControllerProps } from "~types/react-hook-form";

type TFormDatepicker = DateTimePickerProps & {
  controlProps: TControllerProps;
}