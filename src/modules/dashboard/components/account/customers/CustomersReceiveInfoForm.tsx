import { Box, List } from "@mui/material";
import React, { useEffect } from "react";
import { useCallback } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { AddButton } from "~modules-core/components";
import { CustomersContactBox } from "./CustomersContactBox";

type TProps = {
  type: string;
};

export const CustomersReceiveInfoForm: React.FC<TProps> = ({ type }) => {
  const { control, watch, setValue } = useFormContext();

  const { contacts = [] } = watch();

  const { remove, append } = useFieldArray({
    control,
    name: "contacts",
  });

  useEffect(() => {
    if (contacts?.length === 0) {
      setValue("contacts", [{}]);
    }
  }, [contacts?.length]);

  // METHODS
  const handleRemove = useCallback((index: number) => {
    if (confirm(`Xác nhận xóa thông tin liên hệ ${index + 1}`)) {
      remove(index);
    }
  }, []);

  return (
    <Box>
      <List className="pt-0">
        {contacts.map((_: any, index: number) => (
          <CustomersContactBox
            key={index}
            type={type}
            index={index}
            handleRemove={handleRemove}
          />
        ))}
      </List>

      <AddButton onClick={() => append({})}>Thêm thông tin liên hệ</AddButton>
    </Box>
  );
};
