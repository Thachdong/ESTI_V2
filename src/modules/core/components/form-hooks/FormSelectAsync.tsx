import { ErrorMessage } from "@hookform/error-message";
import { Controller } from "react-hook-form";
import { TFromSelectAsync } from "~types/form-controlled/form-select";
import { TRenderControllerParams } from "~types/react-hook-form";
import { FormSelectAsyncBase } from "../form-bases";

export const FormSelectAsync: React.FC<TFromSelectAsync> = (props) => {
  const { controlProps, label, multiple, ...selectProps } = props;

  const renderController = ({
    // ADDRESS CHROME DEV TOOLS WARING: Function components cannot be given refs.
    // Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
    field: { ref, value, ...restField },
    fieldState: { error },
    formState: { errors },
  }: TRenderControllerParams) => {
    const { name } = controlProps;

    const rules = controlProps.rules || {};

    const updateLabel = Object.keys(rules).includes("required")
      ? `${label} *`
      : label;
      
      const cleanValue = multiple ? (value as [] || []) : (value || "")

    const defaultBaseProps = {
      helperText: (
        <ErrorMessage
          errors={errors}
          name={name as any}
          render={({ message }) => message}
        />
      ),
      error: !!error,
      value: cleanValue,
      // value: value || "",
      label: updateLabel,
      queryKey: props?.queryKey || name,
      multiple,
      ...restField,
      ...selectProps,
    };

    return <FormSelectAsyncBase {...defaultBaseProps} />;
  };

  return <Controller {...controlProps} render={renderController} />;
};