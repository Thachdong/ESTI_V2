import { Box, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { mailToCustomer, TCreateMail } from "src/api";
import {
  BaseButton,
  Dialog,
  FormInput,
  FormInputBase,
  FormInputCreatableBase,
  FormTextEditor,
} from "~modules-core/components";
import { toast } from "~modules-core/toast";
import { TDialog } from "~types/dialog";

export const MailToCustomerDialog: React.FC<TDialog> = ({
  onClose,
  open,
  defaultValue,
  type,
  refetch,
}) => {
  const [sendList, setSendList] = useState({ cc: [], bcc: [] });

  const { control, handleSubmit, reset } = useForm();

  const title = type === "Add" ? "Tạo thông báo" : "Nội dung thông báo";

  // METHODS
  const handleSendList = useCallback((key: string, value: string[]) => {
    setSendList((prev) => ({ ...prev, [key]: [...value] }));
  }, []);

  const mutateAdd = useMutation(
    (payload: TCreateMail) => mailToCustomer.create(payload),
    {
      onSuccess: (data: any) => {
        toast.success(data?.resultMessage);

        refetch?.();

        onClose();
      },
    }
  );

  const handleAdd = useCallback(async (data: any) => {
    const payload = {
      ...data,
      cc: sendList.cc?.join(","),
      bcc: sendList.bcc?.join(","),
    };

    await mutateAdd.mutateAsync(payload);
  }, []);

  // SIDE EFFECTS
  useEffect(() => {
    if (!!defaultValue && type !== "Add") {
      const { bcc, cc, content, subject } = defaultValue || {};

      setSendList({ bcc: bcc || [], cc: cc || [] });

      reset({ subject, content });
    }
  }, [defaultValue, type]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" title={title}>
      <Box
        component="form"
        className="grid gap-3"
        onSubmit={(e: any) => e.preventDefault()}
      >
        <Box className="flex items-center gap-3">
          <Typography className="text-right w-[50px]">To: </Typography>

          <FormInputBase title="" disabled value="Khách hàng" shrinkLabel />
        </Box>

        <Box className="flex items-center gap-3">
          <Typography className="text-right w-[50px]">Cc: </Typography>

          <Box className="flex-grow">
            <FormInputCreatableBase
              callback={(chips) => handleSendList("cc", chips)}
              disabled={type !== "Add"}
            />
          </Box>
        </Box>

        <Box className="flex items-center gap-3">
          <Typography className="text-right w-[50px]">Bcc: </Typography>

          <Box className="flex-grow">
            <FormInputCreatableBase
              callback={(chips) => handleSendList("bcc", chips)}
              disabled={type !== "Add"}
            />
          </Box>
        </Box>

        <Box className="flex items-center gap-3">
          <Typography className="text-right w-[50px]">Subject: </Typography>

          <FormInput
            label=""
            controlProps={{
              control,
              name: "subject",
            }}
            shrinkLabel
            disabled={type !== "Add"}
          />
        </Box>

        <Box className="flex items-start gap-3">
          <Typography className="text-right w-[50px]">Content: </Typography>

          <Box className="flex-grow">
            <FormTextEditor
              controlProps={{
                control,
                name: "content",
              }}
              label=""
              className="border-0 p-0"
              editorProps={{
                disabled: type !== "Add",
              }}
            />
          </Box>
        </Box>

        {type === "Add" && (
          <Box className="flex items-center justify-end mt-5">
            <BaseButton onClick={handleSubmit(handleAdd)} className="mr-2">
              Tạo
            </BaseButton>
            <BaseButton type="button" className="!bg-main-1" onClick={onClose}>
              Hủy
            </BaseButton>
          </Box>
        )}
      </Box>
    </Dialog>
  );
};
