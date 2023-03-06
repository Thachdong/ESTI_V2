import { Box, List, Typography } from "@mui/material";
import React from "react";
import { useCallback, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { AddButton } from "~modules-core/components";
import { CustomerDetailContact } from "./CustomerDetailContact";

type TProps = {
  isUpdate: boolean;
};

export const CustomerDetailContactList: React.FC<TProps> = ({ isUpdate }) => {
  const { control, watch } = useFormContext();

  const { contacts } = watch();

  const { remove, append } = useFieldArray({
    control,
    name: "contacts",
  });

  // METHODS
  const handleRemove = useCallback((index: number) => {
    if (confirm("Xác nhận xóa thông tin liên hệ " + index + 1)) {
      remove(index);
    }
  }, []);

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
            handleRemove={handleRemove}
          />
        ))}

        <AddButton className="!font-medium" onClick={() => append({})}>
          Thêm thông tin liên hệ
        </AddButton>
      </List>
    </Box>
  );
};
