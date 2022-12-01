import { ErrorMessage } from "@hookform/error-message";
import { Controller } from "react-hook-form";
import { TFormSelect } from "~types/form-controlled/form-select";
import { TRenderControllerParams } from "~types/react-hook-form";
import { FormSelectBase } from "../form-bases";

export const FormSelectMultiple: React.FC<TFormSelect> = (props) => {
  const { selectShape = {valueKey: "id", labelKey: "name"}} = props;

  const {controlProps, label, ...selectProps} = props;

  const renderController = ({
    field: {ref, value, ...restField}, // ADDRESS CHROME DEV TOOLS WARING: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
    fieldState: { error },
    formState: { errors },
  }: TRenderControllerParams) => {    
    const {name} = controlProps;

    const rules = controlProps.rules || {};

    const updateLabel = Object.keys(rules).includes("required") ? `${label} *` : label;

    const defaultBaseProps = {
      helperText: (
        <ErrorMessage
          errors={errors}
          name={name as any}
          render={({ message }) => message}
        />
      ),
      error: !!error,
      selectShape: selectShape,
      value: value as [] || [],
      label: updateLabel,
      SelectProps: {multiple: true},
      ...restField,
      ...selectProps,
    };

    return <FormSelectBase {...defaultBaseProps} />;
  };

  return <Controller {...controlProps} render={renderController} />;
};
