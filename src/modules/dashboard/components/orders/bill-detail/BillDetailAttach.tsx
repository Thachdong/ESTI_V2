import { Box, InputLabel, List, ListItem, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { DeleteButton, FormUploadBase } from "~modules-core/components";
import AttachFileIcon from "@mui/icons-material/AttachFileRounded";
import { useCallback } from "react";
import { quoteRequest } from "src/api";
import { useRouter } from "next/router";

export const BillDetailAttach: React.FC = () => {
  const { id } = useRouter().query;

  const { control, setValue, watch } = useFormContext();

  const attachFile = watch("attachFile");

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
        <Typography className="font-semibold text-center text-grey mb-3">
          Không có file đính kèm
        </Typography>
      );
    } else {
      return (
        <List>
          {attachFile?.map((file: string) => (
            <ListItem key={file} className="flex w-full py-0" disableGutters>
              <Typography
                component="a"
                href={file}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-grow truncate"
              >
                {file}
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
      className="flex items-cetner justify-center text-main font-bold rounded-sm bg-[#2684C51A] border border-dashed border-main py-3 w-full h-[40px] cursor-pointer uppercase h-auto"
    >
      <AttachFileIcon className="rotate-45" />
      <Typography component="span">Thêm file đính kèm</Typography>
    </InputLabel>
  );

  return (
    <Box className="flex flex-col">
      <Typography className="font-bold uppercase mb-3">
        File đính kèm
      </Typography>

      <Box className="bg-white rounded-sm flex-grow p-3">
        {renderAttachFile()}

        {!id && (
          <FormUploadBase
            controlProps={{
              control,
              name: "attachFile",
            }}
            loader={quoteRequest.uploadFile}
            renderTitle={renderTitle}
            multiple
          />
        )}
      </Box>
    </Box>
  );
};
