import { Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { TRenderControllerParams } from "~types/react-hook-form";
import { Checkbox, FormControlLabel } from "@mui/material";
import { TFormCheckbox } from "~types/form-controlled/form-checkbox";

export const FormCheckbox: React.FC<TFormCheckbox> = (props) => {
  const { controlProps, label, labelProps, ...textFieldProps } = props;

  const renderController = ({
    field: { value, ref, ...restField },
    fieldState: { error },
    formState: { errors },
  }: TRenderControllerParams) => {
    const rules = controlProps.rules || {};

    const updateLabel = Object.keys(rules).includes("required")
      ? `${label} *`
      : label;

    const defaultProps = {
      // helperText: (
      //   <ErrorMessage
      //     errors={errors}
      //     name={controlProps.name}
      //     render={({ message }) => message}
      //   />
      // ),
      error: !!error,
      value: value || "",
      ...restField,
      ...textFieldProps,
    };

    return (
      <FormControlLabel
        control={<Checkbox {...defaultProps} />}
        label={updateLabel}
        {...labelProps}
      />
    );
  };

  return <Controller {...controlProps} render={renderController} />;
};
