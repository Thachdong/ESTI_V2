import {
  CircularProgress,
  IconButton,
  InputAdornment,
  InputLabel,
  TextFieldProps,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Controller } from "react-hook-form";
import { useMutation } from "react-query";
import { TFormImageGallery } from "~types/form-controlled/form-image-gallery";
import { TRenderControllerParams } from "~types/react-hook-form";
import { FormInputBase } from "../form-bases";

export const FormInputFile: React.FC<TFormImageGallery> = (props) => {
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

  const endAdornment = (
    <InputAdornment position="end" className="h-full w-full bg-main p-0">
      <IconButton
        className="h-full w-full rounded-none"
        aria-label="toggle password visibility"
        edge="end"
      >
        {loading ? (
          <CircularProgress size="small" />
        ) : (
          <InputLabel
            className="h-full w-full text-sm text-white font-semibold bg-main"
            htmlFor={controlProps.name}
          >
            File
          </InputLabel>
        )}
      </IconButton>
    </InputAdornment>
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

    return (
      <>
        <FormInputBase
          onChange={onChange}
          value={value}
          InputProps={{ endAdornment, className: "p-0" }}
        />

        <FormInputBase
          id={controlProps.name}
          className="hidden"
          type="file"
          inputProps={{ multiple: true }}
          onChange={handleUpload}
          {...textFieldProps}
        />
      </>
    );
  };

  return <Controller {...controlProps} render={renderController} />;
};
