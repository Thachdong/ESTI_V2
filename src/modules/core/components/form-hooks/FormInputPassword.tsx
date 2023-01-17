import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { TRenderControllerParams } from "~types/react-hook-form";
import { FormInputBase } from "../form-bases";
import { TFormInputProps } from "~types/form-controlled/form-input";

export const FormInputPassword: React.FC<TFormInputProps> = (props) => {
  const { controlProps, ...inputProps } = props;

  const [showPassword, setShowPassword] = useState(false);

  const endAdornment = (
    <InputAdornment position="end" className="!pb-2">
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
    field: { ref, ...restField },
    fieldState: { error },
    formState: { errors },
  }: TRenderControllerParams) => {
    const defaultProps = {
      id: controlProps.name,
      label: "Mật khẩu",
      type: showPassword ? "text" : "password",
      helperText: (
        <ErrorMessage
          errors={errors}
          name={controlProps.name}
          render={({ message }) => message}
        />
      ),
      InputProps: { endAdornment },
      error: !!error,
      ...inputProps,
      ...restField,
    };

    return <FormInputBase {...defaultProps} />;
  };

  return (
    <Controller
      {...controlProps}
      rules={controlProps.rules || { required: "Phải nhập mật khẩu" }}
      render={renderController}
    />
  );
};
