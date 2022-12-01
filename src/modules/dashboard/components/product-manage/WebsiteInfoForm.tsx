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

      <FormTextEditor />
    </Box>
  );
};
