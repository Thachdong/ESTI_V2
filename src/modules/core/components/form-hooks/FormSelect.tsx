import { ErrorMessage } from "@hookform/error-message";
import { Controller } from "react-hook-form";
import { TFormSelect } from "~types/form-controlled/form-select";
import { TRenderControllerParams } from "~types/react-hook-form";
import { FormSelectBase } from "../form-bases";

export const FormSelect: React.FC<TFormSelect> = ({
  controlProps,
  baseProps,
}) => {
  const renderController = ({
    field: { value, ...resField },
    fieldState: { error },
    formState: { errors },
  }: TRenderControllerParams) => {
    const { options, selectShape = {valueKey: "id", labelKey: "name"} } = baseProps;

    const {name} = controlProps;

    const defaultBaseProps = {
      helperText: (
        <ErrorMessage
          errors={errors}
          name={name as any}
          render={({ message }) => message}
        />
      ),
      error: !!error,
      value: options.find((opt) => opt[selectShape.valueKey] === value),
      selectShape: selectShape,
      ...resField,
      ...baseProps,
    };

    return <FormSelectBase {...defaultBaseProps} />;
  };

  return <Controller {...controlProps} render={renderController} />;
};
