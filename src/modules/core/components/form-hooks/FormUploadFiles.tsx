import {
  Box,
  Button,
  ButtonBase,
  InputLabel,
  LinearProgress,
  List,
  ListItem,
} from "@mui/material";
import clsx from "clsx";
import { Controller } from "react-hook-form";
import { ChangeEvent, useState } from "react";
import { useMutation } from "react-query";
import { ErrorMessage } from "@hookform/error-message";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloseIcon from "@mui/icons-material/Close";

import { FormInputBase } from "../form-bases";
import { TRenderControllerParams } from "~types/react-hook-form";
import { TFormImageGallery } from "~types/form-controlled/form-image-gallery";

export const FormUploadfiles: React.FC<TFormImageGallery> = (props) => {
  const {
    controlProps,
    loader,
    title,
    imageListProps,
    className,
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

      onChange([...currentVal, ...urls]);

      setLoading(false);
    };

    const handleRemoveFile = (url: string) => {
      if (!Array.isArray(value)) return;

      const updatedValue = value.filter((vl) => vl !== url);

      onChange(updatedValue);
    };

    const renderFiles = () => {
      if (Array.isArray(value)) {
        return value.map((val: string, index: number) => (
          <ListItem
            key={index}
            className="w-full flex justify-between bg-[#f0f4f7] rounded"
          >
            <a
              href={val}
              target="_blank"
              rel="noopener noreferrer"
              className="2xl:max-w-[500px] max-w-[400px] text-ellipsis whitespace-nowrap overflow-hidden no-underline text-main font-semibold"
            >
              file {"(" + (index + 1) + ")"}
            </a>
            <ButtonBase
              onClick={() => handleRemoveFile(val)}
              className="no-underline text-error bg-[#f4e4e4] rounded-full"
            >
              <CloseIcon className="text-2xl p-1" />
            </ButtonBase>
          </ListItem>
        ));
      }
    };

    return (
      <Box>
        <List className={clsx(className, "grid gap-2")}>{renderFiles()}</List>

        <Button className={clsx("bg-main-2")}>
          <InputLabel
            className="flex items-center justify-center text-[#fff] cursor-pointer mr-1"
            htmlFor={controlProps.name}
          >
            <UploadFileIcon className="mr-2" />
            <span className="font-semibold text-sm">{title || "Tải ảnh"}</span>
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
