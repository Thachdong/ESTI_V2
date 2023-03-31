import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query";
import { products, productsWebsite } from "src/api";
import {
  FormImageGallery,
  FormInput,
  FormTextEditor,
} from "~modules-core/components";
import { toast } from "~modules-core/toast";

type TProps = {
  disabled: boolean;
  refetch: () => void;
  isDelete: boolean;
};

export const ProductDetailWebsite: React.FC<TProps> = ({
  disabled,
  refetch,
  isDelete
}) => {
  const { id } = useRouter().query;

  const { control } = useFormContext();

  const mutateStatus = useMutation(
    (id: string) => productsWebsite.display(id),
    {
      onError: (error: any) => {
        toast.error(error?.resultMessage);
      },
      onSuccess: (data) => {
        toast.success(data.resultMessage);

        refetch();
      },
    }
  );

  const handleChangeStatus = async (e: any) => {
    const isChecked = e?.target?.value;

    if (
      confirm(
        `Cập nhật ${isChecked ? "hiển thị" : "ẩn"} sản phẩm trên website?`
      )
    ) {
      await mutateStatus.mutateAsync(id as string);
    }
  };

  return (
    <>
      <Box className="mt-4">
        <Box className="flex justify-between items-center">
          <Typography className="font-bold uppercase mb-3 text-sm">
            Tối ưu SEO
          </Typography>

          <Box className="flex items-center">
            <FormControlLabel
              onChange={(e) => handleChangeStatus(e)}
              control={<Checkbox checked={!isDelete} />}
              label="Hiển thị SP trên website"
            />
          </Box>
        </Box>

        <Box className="grid lg:grid-cols-2 gap-4 bg-white shadow p-4">
          <FormInput
            controlProps={{
              control,
              name: "videoUrl",
              rules: { required: "Phải nhập video url" },
            }}
            label="Video url"
            disabled={disabled}
          />

          <FormInput
            controlProps={{
              control,
              name: "metaTitle",
              rules: { required: "Phải nhập tiêu đề trang" },
            }}
            label="Tiêu đề trang"
            disabled={disabled}
          />

          <FormInput
            controlProps={{
              control,
              name: "metaKeyWords",
              rules: { required: "Phải nhập từ khóa trang" },
            }}
            label="Từ khóa trang"
            disabled={disabled}
          />

          <FormInput
            controlProps={{
              control,
              name: "metaDescriptions",
              rules: { required: "Phải nhập mô tả trang" },
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
