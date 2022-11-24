import { TextField } from "@mui/material";
import { DateTimePicker, DateTimePickerProps } from "@mui/x-date-pickers";

export const FormDatepickerBase: React.FC<DateTimePickerProps<any, any>> = (
  props
) => {
  const { renderInput, ...restProps } = props;

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
      {...restProps}
    />
  );
};
