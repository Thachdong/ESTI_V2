import {
  Box,
  Button,
  ImageList,
  ImageListItem,
  InputLabel,
  LinearProgress,
} from "@mui/material";
import clsx from "clsx";
import { Controller } from "react-hook-form";
import { ChangeEvent, useState } from "react";
import { useMutation } from "react-query";
import { ErrorMessage } from "@hookform/error-message";
import ClearIcon from "@mui/icons-material/HighlightOffOutlined";
import CameraIcon from "@mui/icons-material/CameraEnhanceOutlined";
import { FormInputBase } from "../form-bases";
import { TRenderControllerParams } from "~types/react-hook-form";
import { TFormImageGallery } from "~types/form-controlled/form-image-gallery";

export const FormImageGallery: React.FC<TFormImageGallery> = (props) => {
  const {
    controlProps,
    loader,
    title,
    imageListProps,
    className,
    disabled,
    ...textFieldProps
  } = props;

  const [loading, setLoading] = useState(false);

  const mutateAdd = useMutation((formData: FormData) =>
    loader(formData).then((res) => res.data)
  );

  const renderController = ({
    field: { value, onChange },
    fieldState: { error },
    formState: { errors },
  }: TRenderControllerParams) => {
    const handleUpload = async (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
    ) => {
      const files = Array.from(e.target.files);

      const promises = files.map((file: any) => {
        const formData = new FormData();

        formData.append("file", file);

        return mutateAdd.mutateAsync(formData);
      });

      setLoading(true);

      const urls = await Promise.all(promises);

      const currentVal = Array.isArray(value) ? value : [];

      const multiple = textFieldProps.inputProps?.multiple;

      if (multiple === false) {
        onChange([...urls]);
      } else {
        onChange([...currentVal, ...urls]);
      }

      setLoading(false);
    };

    const handleRemoveImg = (url: string) => {
      if (!Array.isArray(value)) return;

      const updatedValue = value.filter((vl) => vl !== url);

      onChange(updatedValue);
    };

    const renderImageList = () => {
      if (!Array.isArray(value) || value?.length === 0) return <></>;

      return (
        <ImageList
          className="w-full py-4 pr-4 m-0"
          cols={3}
          gap={8}
          {...imageListProps}
        >
          {value.map((item: string, index: number) => (
            <ImageListItem key={index} className="relative">
              {!disabled && (
                <ClearIcon
                  onClick={() => handleRemoveImg(item)}
                  className="absolute -right-2 -top-2 hover:shadow-inner rounded-full cursor-pointer text-error text-base"
                />
              )}

              <img
                src={`${item}?w=164&fit=crop&auto=format`}
                srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                // onError={({ currentTarget }) =>
                //   (currentTarget.src = process.env.NEXT_PUBLIC_API_URL + item)
                // }
                alt="Không tải được ảnh"
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      );
    };

    return (
      <Box>
        {renderImageList()}

        <Button
          disabled={disabled}
          className={clsx(
            className,
            disabled ? "disable-form-input" : "bg-main-2",
            "mt-3"
          )}
        >
          <InputLabel
            className="flex items-center justify-center text-white cursor-pointer"
            htmlFor={controlProps.name}
          >
            <CameraIcon className="mr-2" />
            <span>{title || "Tải ảnh"}</span>
          </InputLabel>
        </Button>

        <FormInputBase
          id={controlProps.name}
          className="hidden"
          type="file"
          inputProps={{ multiple: true }}
          onChange={handleUpload}
          {...textFieldProps}
        />

        {loading && <LinearProgress className="mt-2" />}

        {error && (
          <ErrorMessage
            errors={errors}
            name={controlProps.name}
            render={({ message }) => message}
          />
        )}
      </Box>
    );
  };

  return <Controller {...controlProps} render={renderController} />;
};
