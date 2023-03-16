import { Box } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { discussion, staff, TDiscussionUpdate, topic } from "src/api";
import {
  BaseButton,
  Dialog,
  FormDatepicker,
  FormInput,
  FormSelect,
  FormSelectAsync,
  FormUploadfiles,
} from "~modules-core/components";
import { toast } from "~modules-core/toast";
import { _format } from "~modules-core/utility/fomat";
import { TDialog } from "~types/dialog";

export const DiscusionTopicDialog: React.FC<TDialog> = ({
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
    (payload: TDiscussionUpdate) => discussion.create(payload),
    {
      onSuccess: (data) => {
        toast.success(data.resultMessage);

        refetch?.();

        onClose();
      },
    }
  );

  const handleAdd = async (data: any) => {
    const newParticipants = data?.participants.toString().replaceAll("[");
    const newAttachFile = data?.attachFile.toString().replaceAll("[");
    await mutateAdd.mutateAsync({
      ...data,
      participants: newParticipants,
      attachFile: newAttachFile,
    });
  };

  return (
    <Dialog
      onClose={onClose}
      open={open}
      maxWidth="md"
      title={"Thêm mới thảo luận"}
    >
      <Box className="grid grid-cols-2 gap-4">
        <FormSelectAsync
          controlProps={{
            control: control,
            name: "topic",
            rules: { required: "Phải chọn nhóm đề tài" },
          }}
          label="Nhóm đề tài"
          fetcher={topic.getList}
          labelKey="topicName"
        />

        <FormSelect
          controlProps={{
            control: control,
            name: "level",
            rules: { required: "Phải chọn cấp độ" },
          }}
          options={[
            { id: 1, name: "HOT" },
            { id: 2, name: "WARM" },
          ]}
          label={"Cấp độ"}
        />
        <FormDatepicker
          controlProps={{
            control: control,
            name: "startTime",
            rules: { required: "Phải chọn thời gian bắt đầu" },
          }}
        />
        <FormDatepicker
          controlProps={{
            control: control,
            name: "endTime",
            rules: { required: "Phải chọn thời gian kết thúc" },
          }}
        />
        <FormInput
          controlProps={{
            control: control,
            name: "descriptionJob",
            rules: { required: "Phải nhập tên nhóm đề tài" },
          }}
          label="Mô tả thảo luận"
          multiline
          rows={2}
        />
        <FormInput
          controlProps={{
            control: control,
            name: "contentDescriptionJob",
            rules: { required: "Phải nhập nội dung thảo luận" },
          }}
          label="Nội dung thảo luận"
          multiline
          rows={2}
        />
        <FormSelectAsync
          controlProps={{
            control: control,
            name: "participants",
            rules: { required: "Phải chọn những người tham gia" },
          }}
          label="Những người tham gia"
          fetcher={staff.getList}
          labelKey="fullName"
          multiple
          className="col-span-2"
        />
        <Box className="col-span-2">
          <FormUploadfiles
            loader={discussion.uploadFile}
            controlProps={{ control, name: "attachFile" }}
            title="Tải file"
            className="col-span-2 grid grid-cols-5 p-0 mb-3"
          />
        </Box>
      </Box>

      <Box className="flex justify-center items-center mt-4">
        <BaseButton onClick={handleSubmit(handleAdd)}>Tạo</BaseButton>

        <BaseButton type="button" className="!bg-main-1 ml-3" onClick={onClose}>
          Hủy
        </BaseButton>
      </Box>
    </Dialog>
  );
};
