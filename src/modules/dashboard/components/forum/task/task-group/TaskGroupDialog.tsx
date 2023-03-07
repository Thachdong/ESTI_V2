import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { taskGroup, TJobGroup } from "src/api";
import { BaseButton, Dialog, FormInput } from "~modules-core/components";
import { _format } from "~modules-core/utility/fomat";
import { TDialog } from "~types/dialog";

export const TaskGroupDialog: React.FC<TDialog> = ({
  onClose,
  open,
  refetch,
  defaultValue,
  type,
}) => {
  const { control, handleSubmit, reset } = useForm<any>({});

  useEffect(() => {
    if (type == "Update") {
      reset({ jobGroupName: defaultValue?.jobGroupName, id: defaultValue?.id });
    }
  }, [defaultValue]);

  //   METHODS
  const mutateAdd = useMutation(
    (payload: { jobGroupName: string }) => taskGroup.create(payload),
    {
      onSuccess: (data) => {
        toast.success(data.resultMessage);

        refetch?.();

        onClose();
      },
    }
  );

  const handleAdd = async (data: any) => {
    await mutateAdd.mutateAsync({
      jobGroupName: data?.jobGroupName,
    });
  };

  const mutateUpdate = useMutation(
    (payload: { jobGroupName: string; id: string }) =>
      taskGroup.update(payload),
    {
      onSuccess: (data) => {
        toast.success(data.resultMessage);

        refetch?.();

        onClose();
      },
    }
  );

  const handleUpdate = async (data: any) => {
    await mutateUpdate?.mutateAsync(data);
  };

  const renderTitle = () => {
    switch (type) {
      case "Add":
        return "Thêm mới nhóm task";
        break;
      case "Update":
        return "Cập nhật nhóm task";
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
    <Dialog onClose={onClose} open={open} maxWidth="sm" title={renderTitle()}>
      <Box className="grid gap-4">
        <FormInput
          controlProps={{
            control: control,
            name: "jobGroupName",
            rules: { required: "Phải nhập tên nhóm task" },
          }}
          label="Tên nhóm task"
        />
      </Box>

      <Box className="flex justify-center items-center mt-4">
        {renderButton()}
      </Box>
    </Dialog>
  );
};
