import { ErrorMessage } from "@hookform/error-message";
import { Controller } from "react-hook-form";
import { TAutocomplete } from "~types/form-controlled/form-select";
import { TRenderControllerParams } from "~types/react-hook-form";
import { AutoCompleteBase } from "../form-bases/AutoCompleteBase";

export const FormSelect: React.FC<TAutocomplete> = (props) => {
  const { controlProps, label, inputProps, ...selectProps } = props;

  const renderController = ({
    field: { ref, ...restField }, // ADDRESS CHROME DEV TOOLS WARING: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
    fieldState: { error },
    formState: { errors },
  }: TRenderControllerParams) => {
    const { name } = controlProps;

    const rules = controlProps.rules || {};

    const updateLabel = Object.keys(rules).includes("required")
      ? `${label} *`
      : label;

    const defaultBaseProps = {
      inputProps: {
        ...inputProps,
        helperText: (
          <ErrorMessage
            errors={errors}
            name={controlProps.name}
            render={({ message }) => message}
          />
        ),
        error: !!error,
      },
      label: updateLabel,
      ...restField,
      ...selectProps,
    };

    return <AutoCompleteBase {...defaultBaseProps} />;
  };

  return <Controller {...controlProps} render={renderController} />;
};
