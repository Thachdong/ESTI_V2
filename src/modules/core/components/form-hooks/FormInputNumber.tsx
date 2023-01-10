import { ErrorMessage } from "@hookform/error-message";
import _ from "lodash";
import { Controller } from "react-hook-form";
import { TFormInputNumberProps } from "~types/form-controlled/form-input-number";
import { TRenderControllerParams } from "~types/react-hook-form";
import { FormInputNumberBase } from "../form-bases";

export const FormInputNumber: React.FC<TFormInputNumberProps> = (props) => {
  const { controlProps, ...baseProps } = props;

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

    const defaultProps = {
      error: !!error,
      ...helperTextOpbject,
      ...restField,
      ...baseProps,
    };

    return <FormInputNumberBase {...defaultProps} />;
  };

  return <Controller {...controlProps} render={renderController} />;
};
