import { Box, Typography } from "@mui/material";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { suppliers, units } from "src/api";
import { products } from "src/api/products";
import {
  FormImageGallery,
  FormInput,
  FormSelect,
  FormSelectAsync,
} from "~modules-core/components";

export const ProductManageForm: React.FC = () => {
  const { control, watch } = useFormContext();

  const { data: productGroups } = useQuery(["productGroups"], () =>
    products.getProductGroups().then((res) => res.data)
  );

  return (
    <Box className="grid grid-cols-3 gap-4 py-3">
      <Box className="grid grid-cols-2 col-span-2 gap-4">
        <FormInput
          controlProps={{
            control,
            name: "productName",
          }}
          label="Tên SP"
          disabled={true}
        />

        <FormSelect
          options={productGroups}
          controlProps={{
            control,
            name: "productGroup",
          }}
          label="Nhóm sản phẩm"
          disabled={true}
        />

        <FormInput
          controlProps={{
            control,
            name: "casCode",
          }}
          label="Mã CAS"
          disabled={true}
        />

        <FormInput
          controlProps={{
            control,
            name: "chemicalName",
          }}
          label="Công thức hóa học"
          disabled={true}
        />

        <FormInput
          controlProps={{
            control,
            name: "manufactor",
          }}
          label="Hãng sản xuất"
          disabled={true}
        />

        <FormInput
          controlProps={{
            control,
            name: "origin",
          }}
          label="Xuất xứ"
          disabled={true}
        />

        <FormInput
          controlProps={{
            control,
            name: "specs",
          }}
          label="Quy cách"
          disabled={true}
        />

        <FormSelectAsync
          fetcher={units.getList}
          controlProps={{
            control,
            name: "unitId",
          }}
          label="Đơn vị tính"
          disabled={true}
          labelKey="unitName"
        />

        <FormSelectAsync
          fetcher={suppliers.getList}
          controlProps={{
            control,
            name: "suppliers",
          }}
          label="Nhà cung cấp"
          className="col-span-2"
          disabled={true}
          multiple={true}
          labelKey="supplierName"
        />
      </Box>

      <Box>
        <FormInput
          controlProps={{
            control,
            name: "productCode",
          }}
          label="Mã SP"
          disabled={true}
          className="mb-3"
        />

        <Box
          component="fieldset"
          className={clsx("!border-grey-2 !rounded-[4px] mb-4")}
        >
          <legend>Ảnh sản phẩm</legend>
          {!watch("image") && (
            <Typography className="text-grey-3 italic mb-2">
              Không có hình ảnh để hiển thị
            </Typography>
          )}
          <FormImageGallery
            loader={products.uploadImage}
            controlProps={{ control, name: "image" }}
            title="Tải ảnh"
            disabled={true}
          />
        </Box>
      </Box>
    </Box>
  );
};
