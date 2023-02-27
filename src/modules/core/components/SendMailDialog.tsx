import { Box, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { TDialog } from "~types/dialog";
import { BaseButton } from "./buttons";
import { Dialog } from "./Dialog";
import { FormInputBase, FormInputCreatableBase } from "./form-bases";
import { FormInput, FormTextEditor } from "./form-hooks";

type TProps = TDialog & {
  sendMailHandler: (data: any) => void;
};

export const SendMailDialog: React.FC<TProps> = ({
  onClose,
  open,
  defaultValue,
  sendMailHandler,
}) => {
  const [sendList, setSendList] = useState({ cc: [], bcc: [] });

  const { control, handleSubmit } = useForm();

  // METHODS
  const handleSendList = useCallback((key: string, value: string[]) => {
    setSendList((prev) => ({ ...prev, [key]: [...value] }));
  }, []);

  const handleSendMail = useCallback(
    async (data: any) => {
      const { title, content } = data || {};

      const { cc, bcc } = sendList;

      await sendMailHandler({ title, content, cc, bcc });
    },
    [sendList]
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" title="Gửi mail">
      <Box
        component="form"
        className="grid gap-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <Box className="flex items-center gap-3">
          <Typography className="text-right w-[50px]">To: </Typography>

          <FormInputBase
            title=""
            disabled
            value={defaultValue?.to}
            shrinkLabel
          />
        </Box>

        <Box className="flex items-center gap-3">
          <Typography className="text-right w-[50px]">Cc: </Typography>

          <Box className="flex-grow">
            <FormInputCreatableBase
              callback={(chips) => handleSendList("cc", chips)}
              defaultChips={[...defaultValue.cc]}
            />
          </Box>
        </Box>

        <Box className="flex items-center gap-3">
          <Typography className="text-right w-[50px]">Bcc: </Typography>

          <Box className="flex-grow">
            <FormInputCreatableBase
              callback={(chips) => handleSendList("bcc", chips)}
            />
          </Box>
        </Box>

        <Box className="flex items-center gap-3">
          <Typography className="text-right w-[50px]">Subject: </Typography>

          <FormInput
            label=""
            controlProps={{
              control,
              name: "title",
            }}
            shrinkLabel
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
            />
          </Box>
        </Box>

        <Box className="flex items-center justify-end mt-5">
          <BaseButton onClick={handleSubmit(handleSendMail)} className="mr-2">
            Gửi
          </BaseButton>
          <BaseButton type="button" className="!bg-main-1" onClick={onClose}>
            Hủy
          </BaseButton>
        </Box>
      </Box>
    </Dialog>
  );
};
