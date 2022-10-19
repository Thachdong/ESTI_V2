import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
} from "@mui/material";
import { useState } from "react";
import {
  Control,
  Controller,
  RegisterOptions,
} from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { TControllerProps } from "~types/react-hook-form";

type TProps = {
  name: string;
  control: Control<any, any>;
  label: string;
  rules?: RegisterOptions;
  inputProps?: OutlinedInputProps
};

export const FormInputPassword: React.FC<TProps> = ({
  name,
  control,
  label,
  rules,
  inputProps
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const endAdornment = (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={() => setShowPassword((showPassword) => !showPassword)}
        edge="end"
      >
        {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
      </IconButton>
    </InputAdornment>
  );

  const initInputProps: OutlinedInputProps = {
    id: name,
    type: showPassword ? "text" : "password",
    label: label  || "Mật khẩu",
    endAdornment,
    ...inputProps
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
      rules={rules || {required: "Phải nhập mật khẩu"}}
      render={renderController}
    />
  );
};
