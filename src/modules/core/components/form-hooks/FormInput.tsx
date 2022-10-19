import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
} from "@mui/material";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { TControllerProps } from "~types/react-hook-form";

type TProps = {
  name: string;
  control: Control<any, any>;
  label: string;
  rules?: RegisterOptions;
  inputProps?: OutlinedInputProps;
};

export const FormInput: React.FC<TProps> = ({
  name,
  control,
  label,
  rules,
  inputProps,
}) => {
  const initInputProps: OutlinedInputProps = {
    id: name,
    label: label,
    type: "text",
    ...inputProps,
  };

  const renderController = ({
    field,
    fieldState: { error },
    formState: { errors },
  }: TControllerProps) => (
    <FormControl variant="outlined" fullWidth>
      <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      <OutlinedInput {...initInputProps} {...field} error={!!error} />
      <FormHelperText error={!!error}>
        <ErrorMessage
          errors={errors}
          name={name as any}
          render={({ message }) => message}
        />
      </FormHelperText>
    </FormControl>
  );

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={renderController}
    />
  );
};
