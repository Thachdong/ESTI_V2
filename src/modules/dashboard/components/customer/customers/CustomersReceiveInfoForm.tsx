import { Box, List } from "@mui/material";
import React from "react";
import { useCallback, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { AddButton } from "~modules-core/components";
import { CustomersContactBox } from "./CustomersContactBox";

type TProps = {
  isDisable: boolean;
  type: string;
};

export const CustomersReceiveInfoForm: React.FC<TProps> = ({
  type,
  isDisable,
}) => {
  const [curators, setCurators] = useState<any[]>([{}]);

  const { control } = useFormContext();

  const { remove, append } = useFieldArray({
    control,
    name: "curatorCreate",
  });

  // METHODS
  const handleAdd = useCallback(() => {
    setCurators([...curators, {}]);

    append({});
  }, [curators]);

  const handleRemove = useCallback(
    (index: number) => {
      if (confirm("Xác nhận xóa thông tin liên hệ " + index + 1)) {
        setCurators((prev) => prev.filter((c: any, i: number) => i !== index));

        remove(index);
      }
    },
    [curators]
  );

  return (
    <Box>
      <List className="pt-0">
        {curators.map((curator: any, index: number) => (
          <React.Fragment key={index}>
            <CustomersContactBox
              isDisable={isDisable}
              type={type}
              index={index}
              handleRemove={handleRemove}
            />
          </React.Fragment>
        ))}
      </List>

      <AddButton onClick={handleAdd}>Thêm thông tin liên hệ</AddButton>
    </Box>
  );
};