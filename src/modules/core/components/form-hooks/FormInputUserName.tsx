import { Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { TRenderControllerParams } from "~types/react-hook-form";
import { TFormInputProps } from "~types/form-controlled/form-input";
import { FormInputBase } from "~modules-core/components/form-bases";
import _ from "lodash";

export const FormInputUserName: React.FC<TFormInputProps> = (props) => {
  const { controlProps, label, ...textFieldProps } = props;

  const renderController = ({
    field: { value, ref, ...restField },
    fieldState: { error },
    formState: { errors },
  }: TRenderControllerParams) => {
    const rules = controlProps.rules || {};

    const defaultProps = {
      helperText: (
        <ErrorMessage
          errors={errors}
          name={controlProps.name}
          render={({ message }) => message}
        />
      ),
      error: !!error,
      value: value || "",
      label: label,
      ...restField,
      ...textFieldProps,
    };

    return <FormInputBase {...defaultProps} />;
  };

  return <Controller {...controlProps} render={renderController} />;
};
