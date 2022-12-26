import { Box } from "@mui/material";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";
import { category } from "src/api/category";
import { products } from "src/api/products";
import {
  FormImageGallery,
  FormInput,
  FormSelectAsync,
  FormTextEditor,
} from "~modules-core/components";

type TProps = {
  isDisable: boolean;
};

export const WebsiteInfoForm: React.FC<TProps> = ({ isDisable }) => {
  const { control } = useFormContext();

  return (
    <Box className="grid grid-cols-2 gap-4 py-3">
      <FormSelectAsync
        fetcher={category.getList}
        controlProps={{
          control,
          name: "categorys",
          rules: { required: "Phải chọn danh mục sản phẩm" },
        }}
        label="Danh mục sản phẩm"
        multiple={true}
        disabled={isDisable}
      />

      <FormInput
        controlProps={{
          control,
          name: "videoUrl",
        }}
        label="Video url"
        disabled={isDisable}
      />

      <FormTextEditor
        controlProps={{
          control,
          name: "description",
        }}
        label="Mô tả ngắn:"
        className="col-span-2"
        editorProps={{ disabled: isDisable }}
      />

      <FormTextEditor
        controlProps={{
          control,
          name: "summary",
        }}
        label="Mô tả sản phẩm:"
        className="col-span-2"
        editorProps={{ disabled: isDisable }}
      />

      <FormTextEditor
        controlProps={{
          control,
          name: "specifications",
        }}
        label="Thông số kĩ thuật:"
        className="col-span-2"
        editorProps={{ disabled: isDisable }}
      />

      <Box
        component="fieldset"
        className={clsx("!border-grey-2 !rounded-[4px] col-span-2 mb-4")}
      >
        <legend>Ảnh sản phẩm</legend>
        <FormImageGallery
          loader={products.uploadImage}
          controlProps={{ control, name: "gallery" }}
          disabled={isDisable}
        />
      </Box>
    </Box>
  );
};
