import { Box, List, Typography } from "@mui/material";
import React from "react";
import { useCallback, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { AddButton } from "~modules-core/components";
import { TDefaultDialogState } from "~types/dialog";
import { CustomerDetailContact } from "./CustomerDetailContact";
import { CustomerDetailCuratorDialog } from "./CustomerDetailCuratorDialog";

type TProps = {
  isUpdate: boolean;
  refetch: () => void;
};

export const CustomerDetailContactList: React.FC<TProps> = ({
  isUpdate,
  refetch,
}) => {
  const [dialog, setDialog] = useState<TDefaultDialogState>({ open: false });

  const { watch } = useFormContext();

  const contacts = watch("contacts");

  // METHODS
  const onClose = useCallback(() => {
    setDialog({ open: false });
  }, []);

  const onOpen = useCallback(() => {
    setDialog({open: true})
  }, [])

  return (
    <Box className="flex flex-col mb-4">
      <Typography className="font-bold uppercase mb-3 text-sm">
        Thông tin liên hệ
      </Typography>

      <List className="bg-white rounded flex-grow p-3">
        {contacts.map((_: any, index: number) => (
          <CustomerDetailContact
            key={index}
            isDisable={!isUpdate}
            index={index}
            refetch={refetch}
          />
        ))}

        <AddButton onClick={onOpen} className="!font-medium">Thêm thông tin liên hệ</AddButton>
      </List>

      <CustomerDetailCuratorDialog
        onClose={onClose}
        open={dialog.open}
        refetch={refetch}
        title="Tạo thông tin liên hệ"
      />
    </Box>
  );
};
