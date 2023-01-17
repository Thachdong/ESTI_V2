import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { suppliers } from "src/api";
import {
  BaseButton,
  Dialog,
  FormInput,
  FormInputNumber,
  FormSelectAsync,
} from "~modules-core/components";
import { TDialog } from "~types/dialog";

export const QuoteDetailSupplierDialog: React.FC<TDialog> = ({
  onClose,
  open,
  type,
}) => {
  const { control } = useForm();

  const title = type === "Add" ? "Thêm nơi lấy hàng" : "Cập nhật nơi lấy hàng";

  return (
    <Dialog
      onClose={onClose}
      open={open}
      maxWidth="sm"
      title={title}
      headerClassName="text-center"
    >
      <Box className="grid gap-4 mb-4">
        <FormSelectAsync
          fetcher={suppliers.getList}
          controlProps={{
            control,
            name: "supplierId",
            rules: { required: "Phải chọn nhà cung cấp" },
          }}
          label="Tên nhà cung cấp"
          labelKey="supplierCode"
        />

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

        <FormInputNumber
          controlProps={{
            control,
            name: "totalPrice",
            rules: { required: "Phải nhập thành tiền" },
          }}
          label="Thành tiền"
          disabled
        />

        <FormInput
          controlProps={{
            control,
            name: "note",
          }}
          label="Ghi chú"
          multiline
          minRows={2}
        />
      </Box>

      <Box className="flex items-center justify-center mt-4">
        {type === "Add" ? (
          <BaseButton>Thêm</BaseButton>
        ) : (
          <BaseButton>Cập nhật</BaseButton>
        )}

        <BaseButton type="button" className="!bg-main-1 ml-2" onClick={onClose}>
          Đóng
        </BaseButton>
      </Box>
    </Dialog>
  );
};
