// USAGE:
// INPUT: NUMBER | UNDEFINED
// OUTPUT: NUMBER | UNDEFINED
import { TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import clsx from "clsx";
import moment from "moment";
import { TFormDatepickerBase } from "~types/form-controlled/form-datepicker";

export const FormDatepickerBase: React.FC<TFormDatepickerBase> = (props) => {
  // EXTRACT PROPS
  const {
    renderInput,
    onChange,
    renderInputProps,
    helperText,
    InputProps,
    ...restProps
  } = props;

  // METHODS
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

  // DEFAULT PROPS
  const defaultRenderInput = !!renderInput
    ? renderInput
    : (params: any) => (
        <TextField
          size="small"
          inputProps={{ placeholder: "Chọn ngày", ...params.inputProps }}
          helperText={helperText}
          {...params}
          {...renderInputProps}
          sx={{
            label: {
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: "12px",
              marginTop: "4px",
            },
          }}
        />
      );

  const defaultInputProps = {
    ...InputProps,
    className: clsx("bg-input-bg ", InputProps?.className),
  };

  return (
    <DateTimePicker
      renderInput={defaultRenderInput}
      dayOfWeekFormatter={(day) => `${day}`}
      onChange={handleChange}
      InputProps={defaultInputProps}
      {...restProps}
    />
  );
};
