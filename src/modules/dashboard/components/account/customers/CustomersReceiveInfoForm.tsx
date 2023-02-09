import { Box, Collapse, List, ListItemButton, Typography } from "@mui/material";
import React from "react";
import { useCallback, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useMutation } from "react-query";
import { customer, TActivateCustomer } from "src/api";
import {
  AddButton,
  AutoCompleteBase,
  DeleteButton,
  FormSelect,
} from "~modules-core/components";
import { accountStatus } from "~modules-core/constance";
import { toast } from "~modules-core/toast";
import { CustomersBill } from "./CustomersBill";
import { CustomersContactBox } from "./CustomersContactBox";
import { CustomersCurator } from "./CustomersCurator";
import { CustomersReceiver } from "./CustomersReceiver";

type TProps = {
  isDisable: boolean;
  type: string;
};

export const CustomersReceiveInfoForm: React.FC<TProps> = ({
  type,
  isDisable,
}) => {
  const [status, setStatus] = useState<number>();

  const [collapses, setCollapses] = useState<number[]>([0]);

  const [curators, setCurators] = useState<any[]>([{}]);

  const { control, watch } = useFormContext();

  const { remove, append } = useFieldArray({
    control,
    name: "curatorCreate",
  });

  // METHODS
  const handleCollapse = useCallback(
    (index: number) => {
      collapses.includes(index)
        ? setCollapses((prev) => prev.filter((i) => i !== index))
        : setCollapses([...collapses, index]);
    },
    [collapses]
  );

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
