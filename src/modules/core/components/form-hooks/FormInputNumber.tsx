import { ErrorMessage } from "@hookform/error-message";
import { Controller } from "react-hook-form";
import { TFormInputNumberProps } from "~types/form-controlled/form-input-number";
import { TRenderControllerParams } from "~types/react-hook-form";
import { FormInputNumberBase } from "../form-bases";

export const FormInputNumber: React.FC<TFormInputNumberProps> = ({
  controlProps,
  baseProps,
}) => {
  const renderController = ({
    field,
    fieldState: { error },
    formState: { errors },
  }: TRenderControllerParams) => {
    const defaultProps = {
      helperText: (
        <ErrorMessage
          errors={errors}
          name={controlProps.name}
          render={({ message }) => message}
        />
      ),
      error: !!error,
      ...field,
      ...baseProps,
    };

    return <FormInputNumberBase baseProps={defaultProps} />;
  };

  return <Controller {...controlProps} render={renderController} />;
};