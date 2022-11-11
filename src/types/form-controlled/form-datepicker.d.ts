import { Moment } from "moment";
import { DateTimePickerProps } from "@mui/x-date-pickers";

type TFormDatepickerBase = {
  value: Moment | undefined | null;
  onChange: (value: Moment | undefined) => void;
  pickerProps?: Omit<
    DateTimePickerProps<any, any>,
    "renderInput" | "value" | "onChange"
  >;
};