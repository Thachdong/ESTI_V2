import { Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { TRenderControllerParams } from "~types/react-hook-form";
import { TFormInputProps } from "~types/form-controlled/form-input";
import { FormInputBase } from "~modules-core/components/form-bases";

export const FormInput: React.FC<TFormInputProps> = ({
  baseProps,
  controlProps,
}) => {
  const renderController = ({
    field: {value, ...restField},
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
      value: value || "",
      ...restField,
      ...baseProps,
    };    

    return <FormInputBase baseProps={defaultProps} />;
  };

  return <Controller {...controlProps} render={renderController} />;
};
