import { ErrorMessage } from "@hookform/error-message";
import { Box } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import clsx from "clsx";
import { Controller } from "react-hook-form";
import { RawEditorOptions } from "tinymce";
import { TFormEditor } from "~types/form-controlled/form-editor";
import { TRenderControllerParams } from "~types/react-hook-form";

const initEditorProps: RawEditorOptions & {
  selector?: undefined;
  target?: undefined;
} = {
  language: "vi",
  height: 200,
  plugins: [
    "advlist",
    "autolink",
    "lists",
    "link",
    "image",
    "charmap",
    "preview",
    "anchor",
    "searchreplace",
    "visualblocks",
    "code",
    "fullscreen",
    "insertdatetime",
    "media",
    "table",
    "code",
    "help",
    "wordcount",
  ],
  toolbar:
    "undo redo | blocks | " +
    "bold italic forecolor | alignleft aligncenter " +
    "alignright alignjustify | bullist numlist outdent indent | " +
    "removeformat | help",
  content_style:
    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
};

export const FormTextEditor: React.FC<TFormEditor> = (props) => {
  const { controlProps, label, editorProps, ...restProps } = props;

  const renderController = ({
    field: { value, onChange },
    formState: { errors },
  }: TRenderControllerParams) => {
    const rules = controlProps.rules || {};

    const updateLabel = Object.keys(rules).includes("required")
      ? `${label} *`
      : label;

    return (
      <Box
        {...restProps}
        component="fieldset"
        className={clsx(
          "!border-grey-2 !rounded-[4px] gap-4 mb-4",
          restProps.className
        )}
      >
        <legend>{updateLabel}</legend>
        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
          init={initEditorProps}
          onEditorChange={onChange}
          value={value}
          {...editorProps}
        />
        {!!errors && (
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
