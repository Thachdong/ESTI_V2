import { Box } from "@mui/material";
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

export const WebsiteInfoForm: React.FC<TProps> = ({isDisable}) => {
  const { control } = useFormContext();

  return (
    <Box className="grid grid-cols-2 gap-4">
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
          name: "shortDescript",
        }}
        label="Mô tả ngắn:"
        className="col-span-2"
        editorProps={{disabled: isDisable}}
      />

      <FormTextEditor
        controlProps={{
          control,
          name: "detail",
        }}
        label="Mô tả sản phẩm:"
        className="col-span-2"
        editorProps={{disabled: isDisable}}
      />

      <FormTextEditor
        controlProps={{
          control,
          name: "technicalSpect",
        }}
        label="Thông số kĩ thuật:"
        className="col-span-2"
        editorProps={{disabled: isDisable}}
      />

      <Box className="col-span-2">
        <FormImageGallery
          loader={products.uploadImage}
          controlProps={{ control, name: "gallery" }}
          title="Tải ảnh sản phẩm"
          disabled={isDisable}
        />
      </Box>
    </Box>
  );
};
