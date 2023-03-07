import { ErrorMessage } from "@hookform/error-message";
import _ from "lodash";
import { Controller } from "react-hook-form";
import { TFormInputNumberProps } from "~types/form-controlled/form-input-number";
import { TRenderControllerParams } from "~types/react-hook-form";
import { FormInputNumberBase } from "../form-bases";

export const FormInputNumber: React.FC<TFormInputNumberProps> = (props) => {
  const { controlProps, label, ...baseProps } = props;

  const renderController = ({
    field: { ref, ...restField },
    fieldState: { error },
    formState: { errors },
  }: TRenderControllerParams) => {
    const helperTextOpbject = _.isEmpty(errors)
      ? {}
      : {
          helperText: (
            <ErrorMessage
              errors={errors}
              name={controlProps.name}
              render={({ message }) => message}
            />
          ),
        };

      const rules = controlProps.rules || {};

      const updateLabel = Object.keys(rules).includes("required")
      ? `${label} *`
      : label;   

    const defaultProps = {
      error: !!error,
      label: updateLabel,
      ...helperTextOpbject,
      ...restField,
      ...baseProps,
    };

    return <FormInputNumberBase {...defaultProps} />;
  };

  return <Controller {...controlProps} render={renderController} />;
};
