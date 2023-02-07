import { Controller } from "react-hook-form";
import { TRenderControllerParams } from "~types/react-hook-form";
import { Checkbox, FormControlLabel } from "@mui/material";
import { TFormCheckbox } from "~types/form-controlled/form-checkbox";
import clsx from "clsx";

export const FormCheckbox: React.FC<TFormCheckbox> = (props) => {
  const { controlProps, label, labelProps, ...textFieldProps } = props;

  const renderController = ({
    field: { value, onChange },
    fieldState: { error },
    formState: { errors },
  }: TRenderControllerParams) => {
    const rules = controlProps.rules || {};

    const updateLabel = Object.keys(rules).includes("required")
      ? `${label} *`
      : label;

    const defaultProps = {
      error,
      checked: !!value,
    };

    return (
      <FormControlLabel
        control={<Checkbox size="small" {...defaultProps} />}
        label={updateLabel}
        className={clsx("!border !border-[#ffff] !rounded", textFieldProps?.className)}
        value={!!value}
        onChange={onChange}
        {...labelProps}
      />
    );
  };

  return <Controller {...controlProps} render={renderController} />;
};
