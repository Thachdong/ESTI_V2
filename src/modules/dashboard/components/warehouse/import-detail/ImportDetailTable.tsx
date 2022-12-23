import { Box, Paper, Stack, Typography } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  AddButton,
  DataTable,
  DeleteButton,
  ViewButton,
} from "~modules-core/components";
import { _format } from "~modules-core/utility/fomat";
import { productColumns } from "~modules-dashboard/pages/warehouse/import-detail/data";
import { TGridColDef } from "~types/data-grid";
import { TDefaultDialogState } from "~types/dialog";
import { ImportDetailProductDialog } from "./ImportDetailProductDialog";

export const ImportDetailTable = () => {
  // LOCAL STATE AND EXTRACT PROPS
  const [dialog, setDialog] = useState<TDefaultDialogState>();

  const [defaultValue, setDefaultValue] = useState<any>();

  const { watch, setValue } = useFormContext();

  const productList = watch("productList") || [];

  const renderProductList =
    productList?.map((product: any, index: number) => ({
      ...product,
      no: index + 1,
    })) || [];

  const totalPrice = useMemo(
    () =>
      productList?.reduce(
        (total: number, product: any) => total + product?.totalPrice,
        0
      ),
    [productList]
  );

  // METHODS
  const handleRemoveProduct = useCallback(
    (product: any) => {
      if (confirm("Xác nhận xóa SP: " + product?.productName)) {
        const updatedProductList = productList.filter(
          (p: any) => p?.id !== product?.id
        );

        setValue("productList", updatedProductList);
      }
    },
    [productList]
  );

  const handleClose = useCallback(() => {
    setDialog({ open: false });
  }, []);

  const handleOpen = useCallback((type: string) => {
    setDialog({ open: true, type });
  }, []);

  const handleAddProduct = useCallback(
    (product: any) => {
      setValue("productList", [...productList, { ...product }]);
    },
    [productList, setValue]
  );

  const handleUpdateProduct = useCallback(
    (product: any) => {
      const updatedProductList = productList.map((p: any) =>
        p.id === product.id ? { ...product } : { ...p }
      );

      setValue("productList", updatedProductList);
    },
    [productList, setValue]
  );

  const handleViewProduct = useCallback((product: any) => {
    setDefaultValue(product);

    handleOpen("Update");
  }, []);

  // DATA TABLE
  const columns: TGridColDef[] = [
    ...productColumns,
    {
      field: "action",
      headerName: "",
      width: 100,
      renderCell: ({ row }) => (
        <Stack direction="row">
          <DeleteButton
            onClick={() => handleRemoveProduct(row)}
            className="min-w-[24px]"
          />
          <ViewButton
            onClick={() => handleViewProduct(row)}
            className="min-w-[24px]"
          />
        </Stack>
      ),
    },
  ];

  return (
    <Paper className="rounded-sm p-3">
      <Box className="flex items-center mb-3">
        <Typography className="text-sm font-medium flex-grow">
          SẢN PHẨM
        </Typography>
        <Box className="flex justify-end">
          <AddButton
            onClick={() => handleOpen("Add")}
            variant="contained"
            className="mr-3"
          >
            Thêm SP
          </AddButton>
          <AddButton variant="contained">Tạo SP mới</AddButton>
        </Box>
      </Box>

      <DataTable
        rows={renderProductList}
        columns={columns}
        autoHeight={true}
        hideSearchbar={true}
        getRowId={(row) => row?.no}
        hideFooter
      />

      <Typography className="my-3">
        Tổng cộng tiền thanh toán(VNĐ):
        <strong> {_format.getVND(totalPrice)}</strong>
      </Typography>

      <ImportDetailProductDialog
        onClose={handleClose}
        open={dialog?.open as boolean}
        type={dialog?.type}
        addProduct={handleAddProduct}
        updateProduct={handleUpdateProduct}
        defaultValue={defaultValue}
      />
    </Paper>
  );
};
