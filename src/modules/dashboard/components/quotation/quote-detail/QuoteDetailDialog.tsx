import { Box, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { products as productApi } from "src/api";
import {
  AddButton,
  BaseButton,
  DataTable,
  DeleteButton,
  Dialog,
  DropdownButton,
  FormInput,
  FormInputBase,
  FormSelect,
  FormSelectAsync,
} from "~modules-core/components";
import { FormInputNumber } from "~modules-core/components/form-hooks/FormInputNumber";
import { VAT } from "~modules-core/constance";
import { supplierColumns } from "~modules-dashboard/pages/quotation/quote-detail/data";
import { TGridColDef } from "~types/data-grid";
import { TDefaultDialogState, TDialog } from "~types/dialog";
import { QuoteDetailSupplierDialog } from "./QuoteDetailSupplierDialog";

export const QuoteDetailDialog: React.FC<TDialog> = ({
  onClose,
  open,
  type,
  defaultValue,
}) => {
  const [dialog, setDialog] = useState<TDefaultDialogState>();

  const [product, setProduct] = useState<any>();

  const { control, handleSubmit, reset } = useForm();

  const { watch: contextWatch, setValue: setContextValue } = useFormContext();

  const products = contextWatch("products");

  const title = type === "Add" ? "Thêm sản phẩm" : "Cập nhật sản phẩm";

  // SIDE EFFECTS
  useEffect(() => {
    if (type === "Add") {
      reset({});
      setProduct({});
    } else {
      reset({ ...defaultValue });
    }
  }, [type]);

  // METHODS
  const callback = useCallback(
    (data: any) => {
      setProduct(data);
    },
    [setProduct]
  );

  const addProduct = useCallback(
    (data: any) => {
      const no = products.length + 1;
      setContextValue("products", [...products, { ...product, ...data, no }]);

      setProduct(null);

      reset({});

      onClose();
    },
    [products, product]
  );

  const updateProduct = useCallback(
    (data: any) => {
      const updatedProducts = products.map((prod: any) =>
        prod?.no === data?.no ? { ...product, ...data } : { ...prod }
      );

      setContextValue("products", updatedProducts);

      onClose();
    },
    [products]
  );

  const onOpenSupplierDialog = useCallback((type: string) => {
    setDialog({ open: true, type });
  }, []);

  const onCloseSupplierDialog = useCallback(() => {
    setDialog({ open: false });
  }, []);

  const columns: TGridColDef[] = [
    ...supplierColumns,
    {
      field: "action",
      headerName: "",
      width: 50,
      renderCell: ({ row }) => (
        <DropdownButton
          id={row?.id}
          items={[
            {
              action: () => onOpenSupplierDialog("Update"),
              label: "Thông tin chi tiết",
            },
            {
              action: () => console.log("delete"),
              label: "Xóa",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <Dialog
      onClose={onClose}
      open={open}
      maxWidth="lg"
      title={title}
      headerClassName="text-center"
    >
      <Box className="grid grid-cols-3 gap-4 mb-4">
        <Box className="col-span-3">
          <Typography className="font-semibold uppercase">
            Thông tin sản phẩm
          </Typography>
        </Box>

        <FormSelectAsync
          fetcher={productApi.getList}
          controlProps={{
            control,
            name: "productId",
            rules: { required: "Phải chọn SP" },
          }}
          callback={callback}
          labelKey="productCode"
          label="Mã SP"
        />

        <FormSelectAsync
          fetcher={productApi.getList}
          controlProps={{
            control,
            name: "productId",
            rules: { required: "Phải chọn SP" },
          }}
          callback={callback}
          labelKey="productName"
          label="Tên SP"
        />

        <FormInputBase
          value={product?.manufactor}
          label="Hãng sản xuất"
          disabled
        />

        <FormInputBase value={product?.specs} label="Quy cách" disabled />

        <FormInputBase value={product?.unitName} label="Đơn vị" disabled />

        <FormInputNumber
          controlProps={{
            control,
            name: "quantity",
            rules: { required: "Phải nhập số lượng" },
          }}
          label="Số lượng"
        />

        <FormInputNumber
          controlProps={{
            control,
            name: "price",
            rules: { required: "Phải nhập giá" },
          }}
          label="Giá"
        />

        <FormSelect
          controlProps={{
            control,
            name: "vat",
            rules: { required: "Phải chọn VAT" },
          }}
          options={VAT}
          label="Thuế GTGT"
        />

        <FormInputNumber
          controlProps={{
            control,
            name: "totalPrice",
            rules: { required: "Phải nhập thành tiền" },
          }}
          label="Thành tiền"
        />

        <FormInput
          controlProps={{
            control,
            name: "note",
          }}
          label="Ghi chú"
          multiline
          minRows={2}
          className="col-span-2"
        />
      </Box>

      <Box className="col-span-2">
        <AddButton onClick={() => onOpenSupplierDialog("Add")} className="mb-2">
          Thêm nơi lấy hàng
        </AddButton>

        <DataTable
          columns={columns}
          rows={[]}
          hideFooter
          hideSearchbar
          autoHeight
          getRowId={(row) => row.no}
        />
      </Box>

      <Box className="flex items-center justify-center mt-4">
        {type === "Add" ? (
          <BaseButton onClick={handleSubmit(addProduct)}>Thêm</BaseButton>
        ) : (
          <BaseButton onClick={handleSubmit(updateProduct)}>
            Cập nhật
          </BaseButton>
        )}

        <BaseButton type="button" className="!bg-main-1 ml-2" onClick={onClose}>
          Đóng
        </BaseButton>
      </Box>

      <QuoteDetailSupplierDialog
        onClose={onCloseSupplierDialog}
        open={!!dialog?.open}
        type={dialog?.type}
      />
    </Dialog>
  );
};
