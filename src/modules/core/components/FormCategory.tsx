import { Box } from "@mui/material";
import clsx from "clsx";
import { useCallback, useState } from "react";
import { category } from "src/api";
import { CategoryDialog } from "~modules-dashboard/components";
import { TDefaultDialogState } from "~types/dialog";
import { TAutocompleteAsync } from "~types/form-controlled/form-select";
import { AddButton } from "./buttons";
import { FormSelectAsync } from "./form-hooks";

type TProps = Omit<TAutocompleteAsync, "fetcher">;

export const FormCategory: React.FC<TProps> = (props) => {
  const [dialog, setDialog] = useState<TDefaultDialogState>({ open: false });

  const onClose = useCallback(() => {
    setDialog({ open: false });
  }, []);

  const onOpen = useCallback(() => {
    setDialog({ open: true, type: "Add" });
  }, []);

  return (
    <>
      <Box className="flex items-start w-full">
        <FormSelectAsync fetcher={category.getList} {...props} className={clsx(props.className, "flex-grow")} />

        <AddButton
          disabled={props?.disabled}
          onClick={onOpen}
          className="!w-[32px] ml-2 !min-w-[40px]"
        />
      </Box>

      <CategoryDialog onClose={onClose} open={dialog.open} type={dialog.type} />
    </>
  );
};
