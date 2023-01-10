import { Box } from "@mui/material";
import { Dialog, FormInputBase } from "~modules-core/components";
import { TDialog } from "~types/dialog";

export const WarehouseImportNoteDialog: React.FC<TDialog> = ({
  open,
  onClose,
  defaultValue,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      title={"Ghi chú - Nhập kho " + defaultValue?.warehouseSessionCode}
      headerClassName="text-center"
    >
      <Box className="grid gap-4">
        <FormInputBase
          label="Shop Manager"
          multiline
          rows={5}
          disabled
          value={defaultValue?.smgNote || "Chưa có ghi chú từ shop manager"}
        />

        <FormInputBase
          label="Admin Sales"
          multiline
          rows={5}
          disabled
          value={defaultValue?.salesAdminNote || "Chưa có ghi chú từ admin sales"}
        />

        <FormInputBase
          label="Delivery"
          multiline
          rows={5}
          disabled
          value={defaultValue?.deliveryNote || "Chưa có ghi chú từ Delivery"}
        />
      </Box>
    </Dialog>
  );
};
