import {
  Box,
  Button,
  ImageList,
  ImageListItem,
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
import ClearIcon from "@mui/icons-material/HighlightOffOutlined";
import UploadFileIcon from "@mui/icons-material/UploadFile";

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
      console.log(urls);

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
          <ListItem key={index}>
            <a
              href={val}
              target="_blank"
              rel="noopener noreferrer"
            >
              {val}
            </a>
            <Button
              onClick={() => handleRemoveFile(val)}
              variant="text"
              className="underline text-warning"
            >
              Xóa
            </Button>
          </ListItem>
        ));
      }
    };

    return (
      <Box>
        <List>{renderFiles()}</List>

        <Button className={clsx(className, "bg-main-2")}>
          <InputLabel
            className="flex items-center justify-center text-[#fff] cursor-pointer"
            htmlFor={controlProps.name}
          >
            <UploadFileIcon className="mr-2" />
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
