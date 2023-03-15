import { Box } from "@mui/material";
import { useCallback, useState } from "react";
import { CategoryDialog } from "~modules-dashboard/components";
import { TDefaultDialogState } from "~types/dialog";
import { TAutocomplete } from "~types/form-controlled/form-select";
import { AddButton } from "./buttons";
import { FormSelect } from "./form-hooks";

export const FormCategory: React.FC<TAutocomplete> = (props) => {
  const [dialog, setDialog] = useState<TDefaultDialogState>({open: false});

  const onClose = useCallback(() => {
    setDialog({ open: false });
  }, []);

  const onOpen = useCallback(() => {
    setDialog({ open: true, type: "Add" });
  }, []);
  
  return (
    <>
      <Box className="flex items-center w-full">
      <FormSelect {...props} />

        <AddButton
          disabled={props?.disabled}
          onClick={onOpen}
          className="!w-[32px] ml-2 !min-w-[40px]"
        />
      </Box>
      
      <CategoryDialog
        onClose={onClose}
        open={dialog.open}
        type={dialog.type}
      />
    </>
  );
};
