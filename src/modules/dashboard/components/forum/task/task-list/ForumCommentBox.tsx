import { Box, ButtonBase, Chip, InputLabel, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormInput, FormUploadBase } from "~modules-core/components";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import SendIcon from "@mui/icons-material/Send";
import { useCallback } from "react";
import { UseMutationResult } from "react-query";

// idObject: taskListId | discussionId
type TProps = {
  fileLoader: (file: FormData) => Promise<TBaseResponse<string>>;
  mutateAdd: UseMutationResult<TBaseResponse<any>, unknown, any, unknown>;
  idObject: object;
};

export const ForumCommentBox: React.FC<TProps> = ({
  fileLoader,
  mutateAdd,
  idObject,
}) => {
  const { control, handleSubmit, watch, setValue, reset } = useForm();

  const { attachFile = [] } = watch();

  const handleDeleteAttachFile = useCallback(
    (f: string) => {
      const files = attachFile.filter((file: string) => file !== f);

      setValue("attachFile", files);
    },
    [attachFile]
  );

  const renderAttatchFiles = useCallback(() => {
    return (
      <Stack direction="row" spacing={1}>
        {attachFile.map((file: string, index: number) => (
          <Chip
            key={file}
            onDelete={() => handleDeleteAttachFile(file)}
            label={
              <a
                className="no-underline"
                href={file}
                target="_blank"
                rel="noopener noreferrer"
              >
                File {index + 1}
              </a>
            }
          />
        ))}
      </Stack>
    );
  }, [attachFile]);

  const handleRepply = useCallback(async (newData: any) => {
    const { attachFile, ...rest } = newData || {};

    let files = "";

    try {
      files = attachFile.join(",");
    } catch (error) {
      console.log(error);
    }

    try {
      await mutateAdd.mutateAsync({
        ...rest,
        attachFile: files,
        ...idObject,
      });

      reset({});
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Box className="px-3 absolute bottom-1 gap-3 w-full">
      <Box>
        <FormInput
          controlProps={{
            control: control,
            name: "title",
          }}
          placeholder="Nhập tiêu đề"
          shrinkLabel
        />
      </Box>
      <Box className="w-full flex items-start">
        <FormInput
          controlProps={{
            control: control,
            name: "note",
            rules: undefined,
          }}
          placeholder="Nhập nội dung phản hồi"
          label=""
          multiline
          rows={3}
          shrinkLabel
        />
      </Box>
      <Box className="w-full flex items-start justify-between">
        <Box className="flex items-center gap-3">
          <FormUploadBase
            loader={fileLoader}
            controlProps={{
              name: "attachFile",
              control: control,
            }}
            multiple
            renderTitle={(loading: boolean) => (
              <ButtonBase className="p-2 flex justify-center items-center bg-[#dde8f3] text-main rounded">
                <InputLabel
                  className="flex justify-center items-center"
                  htmlFor="attachFile"
                >
                  <InsertLinkIcon />
                </InputLabel>
              </ButtonBase>
            )}
          />

          {renderAttatchFiles()}
        </Box>

        <ButtonBase
          className="p-2 flex justify-center items-center bg-[#dde8f3] text-main rounded"
          onClick={handleSubmit(handleRepply)}
        >
          <SendIcon />
        </ButtonBase>
      </Box>
    </Box>
  );
};
