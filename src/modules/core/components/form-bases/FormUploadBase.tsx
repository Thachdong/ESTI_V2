// A MINIMAL FORM ALLOW USER UPLOAD FILE WITH:
// + DEFAULT HIDDEN FILE INPUT,
// + UPLOAD METHOD

import { Box } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Controller } from "react-hook-form";
import { useMutation } from "react-query";
import { TFormUploadBase } from "~types/form-controlled/form-image-gallery";
import { TRenderControllerParams } from "~types/react-hook-form";
import { FormInputBase } from "./FormInputBase";

export const FormUploadBase: React.FC<TFormUploadBase> = (props) => {
  const { controlProps, loader, renderTitle, multiple = false } = props;

  const [loading, setLoading] = useState(false);

  const mutateAdd = useMutation((formData: FormData) =>
    loader(formData).then((res) => res.data)
  );

  const renderController = ({
    field: { value, onChange },
    fieldState,
    formState,
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

    return (
      <>
        {renderTitle(loading)}

        <FormInputBase
          id={controlProps.name}
          className="hidden"
          type="file"
          inputProps={{ multiple }}
          onChange={handleUpload}
        />
      </>
    );
  };

  return <Controller {...controlProps} render={renderController} />;
};
