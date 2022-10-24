import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { TControllerProps } from "~types/react-hook-form";
import { FormInputBase } from "../form-base";
import { TFormInputProps } from "~types/form-controlled/form-input";

export const FormInputPassword: React.FC<TFormInputProps> = ({
  name,
  control,
  rules,
  inputProps,
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

  const renderController = ({
    field,
    fieldState: { error },
    formState: { errors },
  }: TControllerProps) => {
    const defaultProps = {
      id: name,
      label: "Mật khẩu",
      type: showPassword ? "text" : "password",
      helperText: (
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => message}
        />
      ),
      InputProps: { endAdornment },
      error: !!error,
      ...inputProps,
      ...field,
    };

    return <FormInputBase inputProps={defaultProps} />;
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules || { required: "Phải nhập mật khẩu" }}
      render={renderController}
    />
  );
};
