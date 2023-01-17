import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { AddButton, DataTable } from "~modules-core/components";
import { dialogColumns } from "~modules-dashboard/pages/purchase/purchase-plan/data";
import { TDefaultDialogState } from "~types/dialog";
import { PurchasePlanProductDialog } from "./PurchasePlanProductDialog";

export const PurchasePlanTable: React.FC = () => {
  const [dialog, setDialog] = useState<TDefaultDialogState>();

  const { watch } = useFormContext();

  const products = watch("products");

  return (
    <Paper className="p-4 mb-4">
      <Box className="flex items-center mb-2">
        <Typography className="font-semibold flex-grow text-sm">
          THÔNG TIN SẢN PHẨM
        </Typography>

        <AddButton onClick={() => setDialog({open: true, type: "Add"})}>Thêm SP</AddButton>
      </Box>

      <DataTable
        rows={products}
        columns={dialogColumns}
        hideFooter
        autoHeight
        hideSearchbar
      />

      <PurchasePlanProductDialog
        onClose={() => setDialog({ open: false })}
        open={Boolean(dialog?.open)}
        type={dialog?.type as string}
      />
    </Paper>
  );
};
