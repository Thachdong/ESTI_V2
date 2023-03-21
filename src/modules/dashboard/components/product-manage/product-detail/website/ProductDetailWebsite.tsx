import { Box, Typography } from "@mui/material";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";
import { products } from "src/api";
import {
  FormImageGallery,
  FormInput,
  FormTextEditor,
} from "~modules-core/components";

type TProps = {
  disabled: boolean;
};

export const ProductDetailWebsite: React.FC<TProps> = ({ disabled }) => {
  const { control } = useFormContext();

  return (
    <>
      <Box className="mt-4">
        <Typography className="font-bold uppercase mb-3 text-sm">
          Thông tin chung
        </Typography>

        <Box className="grid grid-cols-2 gap-4 bg-white shadow p-4">
          <FormInput
            controlProps={{
              control,
              name: "videoUrl",
            }}
            label="Video url"
            disabled={disabled}
          />

          <FormInput
            controlProps={{
              control,
              name: "metaTitle",
            }}
            label="Tiêu đề trang"
            disabled={disabled}
          />

          <FormInput
            controlProps={{
              control,
              name: "metaKeyWords",
            }}
            label="Từ khóa trang"
            disabled={disabled}
          />

          <FormInput
            controlProps={{
              control,
              name: "metaDescriptions",
            }}
            label="Mô tả trang"
            multiline
            minRows={3}
            disabled={disabled}
          />
        </Box>
      </Box>

      <Box className="mt-4">
        <Typography className="font-bold uppercase mb-3 text-sm">
          Thông tin chi tiết
        </Typography>

        <Box className="grid grid-cols-2 gap-4 bg-white shadow p-4">
          <FormTextEditor
            controlProps={{
              control,
              name: "description",
            }}
            label="Mô tả ngắn:"
            className="col-span-2"
            editorProps={{ disabled: disabled }}
          />

          <FormTextEditor
            controlProps={{
              control,
              name: "summary",
            }}
            label="Mô tả sản phẩm:"
            className="col-span-2"
            editorProps={{ disabled: disabled }}
          />

          <FormTextEditor
            controlProps={{
              control,
              name: "specifications",
            }}
            label="Thông số kĩ thuật:"
            className="col-span-2"
            editorProps={{ disabled: disabled }}
          />

          <Box
            component="fieldset"
            className={clsx("!border-grey-2 !rounded-[4px] col-span-2 mb-4")}
          >
            <legend>Ảnh sản phẩm</legend>
            <FormImageGallery
              loader={products.uploadImage}
              controlProps={{ control, name: "gallery" }}
              disabled={disabled}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};