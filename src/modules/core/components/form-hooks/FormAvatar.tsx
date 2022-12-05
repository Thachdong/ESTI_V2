import { Avatar, InputLabel, LinearProgress, Tooltip } from "@mui/material";
import clsx from "clsx";
import { FormInputBase } from "../form-bases";
import CameraIcon from "@mui/icons-material/CameraEnhanceOutlined";
import styles from "../../styles/form-avatar.module.css";
import { TFormAvatar } from "~types/form-controlled/form-avatar";
import { TRenderControllerParams } from "~types/react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Controller } from "react-hook-form";
import { ChangeEvent, useState } from "react";
import { useMutation } from "react-query";
import { toast } from "~modules-core/toast";

export const FormAvatar: React.FC<TFormAvatar> = (props) => {
  const { controlProps, avatarProps, label, loader, ...textFieldProps } = props;

  const [loading, setLoading] = useState(false);

  const mutateAdd = useMutation((formData: FormData) => loader(formData));

  const renderController = ({
    field: { value, onChange },
    fieldState: { error },
    formState: { errors },
  }: TRenderControllerParams) => {
    const handleUpload = async (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
    ) => {
      const file = e.target.files?.[0];

      const formData = new FormData();

      formData.append("file", file);

      setLoading(true);

      await mutateAdd
        .mutateAsync(formData)
        .then((res) => {
          onChange(res.data);
        })
        .catch((error) => {
          toast.error(error?.resultMessage);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    return (
      <Tooltip title={label || "Tải ảnh lên"} arrow>
        <div className={clsx(styles["form-avatar"], "relative")}>
          <Avatar
            src={value}
            className="w-[125px] h-[125px]"
            {...avatarProps}
          />

          <InputLabel
            htmlFor="form-avatar"
            className={clsx(
              styles["input-box"],
              "absolute rounded-full flex items-end justify-center text-white pb-1"
            )}
          >
            <CameraIcon />
            <FormInputBase
              id="form-avatar"
              className="hidden"
              type="file"
              onChange={handleUpload}
              {...textFieldProps}
            />
          </InputLabel>

          {loading && <LinearProgress className="mt-2" />}

          {error && (
            <ErrorMessage
              errors={errors}
              name={controlProps.name}
              render={({ message }) => message}
            />
          )}
        </div>
      </Tooltip>
    );
  };

  return <Controller {...controlProps} render={renderController} />;
};
