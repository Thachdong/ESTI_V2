import { Box } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { category } from "src/api/category";
import { FormSelectAsync, FormTextEditor } from "~modules-core/components";

type TProps = {
  isDisable: boolean;
};

export const WebsiteInfoForm: React.FC<TProps> = () => {
  const { control, watch } = useFormContext();

  return (
    <Box className="grid gap-4">
      <FormSelectAsync
        fetcher={category.getList}
        controlProps={{
          control,
          name: "categorys",
          rules: { required: "Phải chọn danh mục sản phẩm" },
        }}
        label="Danh mục sản phẩm"
        multiple={true}
      />

      <FormTextEditor
        controlProps={{
          control,
          name: "shortDescript",
        }}
        label="Mô tả ngắn:"
      />

      <FormTextEditor
        controlProps={{
          control,
          name: "detail",
        }}
        label="Mô tả sản phẩm:"
      />

      <FormTextEditor
        controlProps={{
          control,
          name: "technicalSpect",
        }}
        label="Thông số kĩ thuật:"
      />
    </Box>
  );
};
