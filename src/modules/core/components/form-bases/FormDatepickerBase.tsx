// USAGE:
// INPUT: NUMBER | UNDEFINED
// OUTPUT: NUMBER | UNDEFINED
import { TextField } from "@mui/material";
import { DateTimePicker, DateTimePickerProps } from "@mui/x-date-pickers";

export const FormDatepickerBase: React.FC<DateTimePickerProps<any, any>> = (
  props
) => {
  const { renderInput, onChange, ...restProps } = props;

  const handleChange = (value: any, _?: string | undefined) => {
    if (value?._isValid) {
      onChange(value?.valueOf());
    } else {
      onChange("invalidDate");
    }
  };

  return (
    <DateTimePicker
      renderInput={(params: any) => (
        <TextField
          size="small"
          inputProps={{ ...params.inputProps, placeholder: "Chọn ngày" }}
          {...params}
          {...restProps}
        />
      )}
      dayOfWeekFormatter={(day) => `${day}`}
      onChange={handleChange}
      {...restProps}
    />
  );
};
