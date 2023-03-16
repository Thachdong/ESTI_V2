import { Box } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { topic } from "src/api";
import { BaseButton, Dialog, FormInput } from "~modules-core/components";
import { toast } from "~modules-core/toast";
import { _format } from "~modules-core/utility/fomat";
import { TDialog } from "~types/dialog";

export const TopicDialog: React.FC<TDialog> = ({
  onClose,
  open,
  refetch,
  defaultValue,
  type,
}) => {
  const { control, handleSubmit, reset } = useForm<any>({});

  useEffect(() => {
    if (type == "Update") {
      reset({ topicName: defaultValue?.topicName, id: defaultValue?.id });
    }
  }, [defaultValue]);

  //   METHODS
  const mutateAdd = useMutation(
    (payload: { topicName: string }) => topic.create(payload),
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
      topicName: data?.topicName,
    });
  };

  const mutateUpdate = useMutation(
    (payload: { topicName: string; id: string }) => topic.update(payload),
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
        return "Thêm mới nhóm đề tài";
        break;
      case "Update":
        return "Cập nhật nhóm đề tài";
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
            name: "topicName",
            rules: { required: "Phải nhập tên nhóm đề tài" },
          }}
          label="Tên nhóm đề tài"
        />
      </Box>

      <Box className="flex justify-center items-center mt-4">
        {renderButton()}
      </Box>
    </Dialog>
  );
};
