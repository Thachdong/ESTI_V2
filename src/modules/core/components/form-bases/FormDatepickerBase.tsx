// USAGE:
// INPUT: NUMBER | UNDEFINED
// OUTPUT: NUMBER | UNDEFINED
import { TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { TFormDatepickerBase } from "~types/form-controlled/form-datepicker";

export const FormDatepickerBase: React.FC<TFormDatepickerBase> = (props) => {
  const {
    renderInput = (params: any) => (
      <TextField
        size="small"
        inputProps={{ placeholder: "Chọn ngày", ...params.inputProps }}
        helperText={helperText}
        {...params}
        {...renderInputProps}
        {...restProps}
      />
    ),
    onChange,
    renderInputProps,
    helperText,
    ...restProps
  } = props;

  const handleChange = (
    value: any,
    keyboardInputValue?: string | undefined
  ) => {
    const keyboardInputDate = moment(keyboardInputValue, props.inputFormat);

    if (value?._isValid || keyboardInputDate.isValid()) {
      onChange(value?.valueOf());
    } else {
      onChange("invalidDate");
    }
  };

  return (
    <DateTimePicker
      renderInput={renderInput}
      dayOfWeekFormatter={(day) => `${day}`}
      onChange={handleChange}
      {...restProps}
    />
  );
};
