import { ErrorMessage } from "@hookform/error-message";
import clsx from "clsx";
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
    const defaultProps = {
      helperText: (
        <ErrorMessage
          errors={errors}
          name={controlProps.name}
          render={({ message }) => message}
        />
      ),
      error: !!error,
      ...restField,
      ...baseProps,
    };

    return (
      <FormInputNumberBase
        {...defaultProps}
        className={clsx(
          defaultProps.disabled == true && "bg-[#f0f0f0]",
          "!h-[40px]"
        )}
      />
    );
  };

  return <Controller {...controlProps} render={renderController} />;
};
