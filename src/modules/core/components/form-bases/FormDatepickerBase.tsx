import { TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { TFormDatepickerBase } from "~types/form-controlled/form-datepicker";

export const FormDatepickerBase: React.FC<TFormDatepickerBase> = ({
  value,
  onChange,
  pickerProps,
}) => {
  return (
    <DateTimePicker
      renderInput={(params: any) => <TextField {...params} />}
      value={value}
      onChange={onChange}
      {...pickerProps}
    />
  );
};