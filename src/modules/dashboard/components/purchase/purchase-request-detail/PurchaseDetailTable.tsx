import { Box, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  AddButton,
  BaseButton,
  DataTable,
  DropdownButton,
  FormDatepickerBase,
} from "~modules-core/components";
import { dialogColumns } from "~modules-dashboard/pages/purchase/purchase-plan/data";
import { TGridColDef } from "~types/data-grid";
import { TDefaultDialogState } from "~types/dialog";
import { PurchaseDetailDialog } from "./PurchaseDetailDialog";

export const PurchaseDetailTable = () => {
  const [dialog, setDialog] = useState<TDefaultDialogState>();

  const { watch } = useFormContext();

  const products = watch("products") || [];

  // METHODS
  const handleCloseDialog = useCallback(() => {
    setDialog({ open: false });
  }, []);

  const handleOpenDialog = useCallback((type: string) => {
    setDialog({ open: true, type });
  }, []);

  const handleRemoveProduct = useCallback((no: number) => {
    const product = products.find((prod: any) => prod?.no === no);

    if (!product) return;

    if(confirm(`Xác nhận xóa SP ${product?.productCode}`)) {
        
    }
  }, []);

  const columns: TGridColDef[] = [
    ...dialogColumns,
    {
      field: "action",
      headerName: "",
      width: 50,
      renderCell: ({ row }) => (
        <DropdownButton
          id={row?.id}
          items={[
            {
              action: () => setDialog({ open: true, type: "View" }),
              label: "Thông tin chi tiết",
            },
            // {
            //   action: handleDelete,
            //   label: "Xóa",
            // },
          ]}
        />
      ),
    },
  ];

  return (
    <Box className="bg-white p-4 mb-4">
      <Box className="flex items-center mb-2">
        <Typography className="font-semibold text-sm mr-4">
          THÔNG TIN SẢN PHẨM
        </Typography>

        <AddButton onClick={() => handleOpenDialog("Add")}>Thêm SP</AddButton>
      </Box>

      <Box className="grid grid-cols-10 gap-4 mb-4">
        <FormDatepickerBase
          label="Từ ngày"
          onChange={(e: any) => console.log(e)}
          className="col-span-4"
        />
        <FormDatepickerBase
          label="Đến ngày"
          onChange={(e: any) => console.log(e)}
          className="col-span-4"
        />

        <BaseButton>Lọc</BaseButton>
      </Box>

      <DataTable
        rows={products.map((prod: any, index: number) => ({
          ...prod,
          no: ++index,
        }))}
        columns={columns}
        hideFooter
        autoHeight
        hideSearchbar
      />

      <PurchaseDetailDialog
        onClose={handleCloseDialog}
        open={Boolean(dialog?.open)}
        type={dialog?.type as string}
      />
    </Box>
  );
};
