import { Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { TControllerProps } from "~types/react-hook-form";
import { TFormInputProps } from "~types/form-controlled/form-input";
import { FormInputBase } from "~modules-core/components/form-base";

export const FormInput: React.FC<TFormInputProps> = ({
  name,
  control,
  rules,
  inputProps,
}) => {
  const renderController = ({
    field,
    fieldState: { error },
    formState: { errors },
  }: TControllerProps) => {
    const defaultProps = {
      helperText: (
        <ErrorMessage
          errors={errors}
          name={name as any}
          render={({ message }) => message}
        />
      ),
      error: !!error,
      ...field,
      ...inputProps,
    };

    return <FormInputBase inputProps={defaultProps} />;
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={renderController}
    />
  );
};
