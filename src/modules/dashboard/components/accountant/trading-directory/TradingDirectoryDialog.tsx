import { Box } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { categoryTransaction, TCategoryTransactionUpdate } from "src/api";
import {
  BaseButton,
  Dialog,
  FormInput,
  FormSelect,
} from "~modules-core/components";
import { TypeTransaction } from "~modules-core/constance";
import { toast } from "~modules-core/toast";
import { _format } from "~modules-core/utility/fomat";
import { TDialog } from "~types/dialog";

export const TradingDirectoryDialog: React.FC<TDialog> = ({
  onClose,
  open,
  refetch,
  defaultValue,
  type,
}) => {
  const { control, handleSubmit, reset, setValue } = useForm<any>({});

  useEffect(() => {
    if (type == "Update") {
      reset({
        categoryName: defaultValue?.categoryName,
        type: defaultValue?.type,
      });
    }
  }, [defaultValue]);

  //   ADD
  const mutateAdd = useMutation(
    (payload: TCategoryTransactionUpdate) =>
      categoryTransaction.create(payload),
    {
      onSuccess: (data) => {
        toast.success(data.resultMessage);
        refetch?.();
        reset();
        onClose();
      },
    }
  );

  const handleAdd = async (data: TCategoryTransactionUpdate) => {
    await mutateAdd.mutateAsync(data);
  };

  //   UPDATE
  const mutateUpdate = useMutation(
    (payload: { categoryName: string; type: number; id: string }) =>
      categoryTransaction.update(payload),
    {
      onSuccess: (data) => {
        toast.success(data.resultMessage);
        refetch?.();
        onClose();
      },
    }
  );

  const handleUpdate = async (data: any) => {
    await mutateUpdate.mutateAsync({
      id: defaultValue?.id,
      categoryName: data?.categoryName,
      type: data?.type,
    });
  };

  const renderTitle = () => {
    switch (type) {
      case "Add":
        return "Thêm mới danh mục giao dịch";
        break;
      case "Update":
        return "Cập nhật danh mục giao dịch";
        break;
      default:
        break;
    }
  };

  const renderButton = () => {
    switch (type) {
      case "Add":
        return (
          <>
            <BaseButton onClick={handleSubmit(handleAdd)}>Tạo</BaseButton>

            <BaseButton
              type="button"
              className="!bg-main-1 ml-3"
              onClick={onClose}
            >
              Hủy
            </BaseButton>
          </>
        );
        break;
      case "Update":
        return (
          <>
            <BaseButton onClick={handleSubmit(handleUpdate)}>
              Cập nhật
            </BaseButton>

            <BaseButton
              type="button"
              className="!bg-main-1 ml-3"
              onClick={onClose}
            >
              Hủy
            </BaseButton>
          </>
        );
        break;
      default:
        break;
    }
  };

  return (
    <Dialog onClose={onClose} open={open} maxWidth={"xs"} title={renderTitle()}>
      <Box className="grid gap-3">
        <FormInput
          controlProps={{
            control: control,
            name: "categoryName",
            rules: { required: "Phải nhập tên danh mục" },
          }}
          label="Tên danh mục"
          shrinkLabel
        />
        <FormSelect
          options={TypeTransaction}
          label={"Loại"}
          controlProps={{
            name: "type",
            control: control,
            rules: undefined,
          }}
          shrinkLabel
        />
      </Box>

      <Box className="flex justify-center items-center mt-4">
        {renderButton()}
      </Box>
    </Dialog>
  );
};
