import { ErrorMessage } from "@hookform/error-message";
import { DateTimePickerProps } from "@mui/x-date-pickers";
import moment from "moment";
import { Controller } from "react-hook-form";
import { TFormDatepicker } from "~types/form-controlled/form-datepicker";
import { TRenderControllerParams } from "~types/react-hook-form";
import { FormDatepickerBase } from "../form-bases";

export const FormDatepicker: React.FC<TFormDatepicker> = (props) => {
  const { controlProps, ...textFieldProps } = props;

  const renderController = ({
    field: { value, ref, ...restField },
    fieldState: { error },
    formState: { errors },
  }: TRenderControllerParams) => {
    let safetyValue: any = {};

    if (value !== "invalidDate") {
      safetyValue.value = moment(value);
    }

    if (value === undefined) {
      safetyValue.value = null;
    }

    const defaultProps: DateTimePickerProps<any, any> = {
      helperText: (
        <ErrorMessage
          errors={errors}
          name={controlProps.name}
          render={({ message }) => message}
        />
      ),
      error: error,
      ...safetyValue,
      ...restField,
      ...textFieldProps,
    };

    return <FormDatepickerBase {...defaultProps} />;
  };

  return <Controller {...controlProps} render={renderController} />;
};
