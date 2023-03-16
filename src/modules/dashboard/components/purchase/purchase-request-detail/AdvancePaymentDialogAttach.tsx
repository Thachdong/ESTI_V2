import { Box, InputLabel, List, ListItem, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { DeleteButton, FormUploadBase } from "~modules-core/components";
import AttachFileIcon from "@mui/icons-material/AttachFileRounded";
import { useCallback } from "react";
import { purchaseOrder, quoteRequest } from "src/api";
import { useRouter } from "next/router";

export const AdvancePaymentDialogAttach: React.FC = () => {
  const { control, setValue, watch } = useFormContext();

  const attachFile = watch("attachFile");

  const { id } = useRouter().query;

  // METHODS
  const removeFile = useCallback(
    (file: string) => {
      const newFiles = attachFile.filter((f: string) => f !== file);

      setValue("attachFile", newFiles);
    },
    [attachFile]
  );

  const renderAttachFile = useCallback(() => {
    if (!attachFile || attachFile?.length === 0) {
      return (
        <Typography className="text-center text-grey my-3">
          Không có file đính kèm
        </Typography>
      );
    } else {
      return (
        <List className="grid gap-2">
          {attachFile?.map((file: string) => (
            <ListItem
              key={file}
              className="flex justify-between py-0 px-3 bg-[#f4f6f8] gap-2 rounded truncate"
              disableGutters
            >
              <Typography
                component="a"
                href={file}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 items-center truncate no-underline text-main w-[500px] "
              >
                <AttachFileIcon className="rotate-90 text-xl" />{" "}
                <span className="truncate">
                  {file}
                </span>
              </Typography>

              <DeleteButton
                disabled={!!id}
                onClick={() => removeFile(file)}
                className="min-w-[24px] text-error"
              />
            </ListItem>
          ))}
        </List>
      );
    }
  }, [attachFile]);

  const renderTitle = (loading: boolean) => (
    <InputLabel
      disabled={loading}
      htmlFor="attachFile"
      className="flex items-center justify-center text-main font-bold rounded bg-[#2684C51A] border border-solid border-main w-full h-[40px] cursor-pointer uppercase"
    >
      <AttachFileIcon className="rotate-45" />
      <Typography component="span" className="text-sm font-semibold">
        Thêm file đính kèm
      </Typography>
    </InputLabel>
  );

  return (
    <Box className="flex flex-col mt-4">
      <Typography className="font-bold uppercase mb-3 text-sm">
        File đính kèm
      </Typography>

      <Box className="bg-white rounded flex-grow p-3">
        {renderAttachFile()}
        <FormUploadBase
          controlProps={{
            control,
            name: "attachFile",
          }}
          loader={purchaseOrder.uploadFile}
          renderTitle={renderTitle}
          multiple
        />
      </Box>
    </Box>
  );
};
