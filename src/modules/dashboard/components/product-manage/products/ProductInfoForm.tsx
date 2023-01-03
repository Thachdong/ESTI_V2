import { Box } from "@mui/material";
import clsx from "clsx";
import { useEffect } from "react";
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

type TProps = {
  isDisable: boolean;
};

export const ProductInfoForm: React.FC<TProps> = ({ isDisable }) => {
  const { control } = useFormContext();

  const { data: productGroups } = useQuery(["productGroups"], () =>
    products.getProductGroups().then((res) => res.data)
  );

  useEffect(() => {
    console.log("component mounted");
    
  }, [])

  return (
    <Box className="grid grid-cols-2 gap-4 py-3">
      <FormInput
        controlProps={{
          control,
          name: "productName",
          rules: { required: "Phải nhập tên SP" },
        }}
        label="Tên SP"
        disabled={isDisable}
      />

      <FormInput
        controlProps={{
          control,
          name: "productCode",
          rules: { required: "Phải nhập mã SP" },
        }}
        label="Mã SP"
        disabled={isDisable}
      />

      <FormSelect
        options={productGroups}
        controlProps={{
          control,
          name: "productGroup",
          rules: { required: "Phải chọn nhóm SP" },
        }}
        label="Nhóm sản phẩm"
        disabled={isDisable}
      />

      <FormInput
        controlProps={{
          control,
          name: "manufactor",
          rules: { required: "Phải nhập hãng sản xuất" },
        }}
        label="Hãng sản xuất"
        disabled={isDisable}
      />

      <FormInput
        controlProps={{
          control,
          name: "origin",
          rules: { required: "Phải nhập xuất xứ" },
        }}
        label="Xuất xứ"
        disabled={isDisable}
      />

      <FormSelectAsync
        fetcher={units.getList}
        controlProps={{
          control,
          name: "unitId",
          rules: { required: "Phải chọn đơn vị tính" },
        }}
        label="Đơn vị tính"
        disabled={isDisable}
        labelKey="unitName"
      />

      <FormSelectAsync
        fetcher={suppliers.getList}
        controlProps={{
          control,
          name: "suppliers",
          rules: { required: "Phải chọn nhà cung cấp" },
        }}
        label="Nhà cung cấp"
        disabled={isDisable}
        multiple={true}
        labelKey="supplierName"
      />

      <FormInput
        controlProps={{
          control,
          name: "casCode",
        }}
        label="Mã CAS"
        disabled={isDisable}
      />

      <FormInput
        controlProps={{
          control,
          name: "chemicalName",
        }}
        label="Công thức hóa học"
        disabled={isDisable}
      />

      <FormInput
        controlProps={{
          control,
          name: "specs",
        }}
        label="Quy cách"
        disabled={isDisable}
      />

      <Box
        component="fieldset"
        className={clsx("!border-grey-2 !rounded-[4px] col-span-2 mb-4")}
      >
        <legend>Ảnh sản phẩm</legend>
        <FormImageGallery
          loader={products.uploadImage}
          controlProps={{ control, name: "image" }}
          title="Tải ảnh"
          inputProps={{ multiple: false }}
          disabled={isDisable}
          imageListProps={{ cols: 1 }}
        />
      </Box>
    </Box>
  );
};
