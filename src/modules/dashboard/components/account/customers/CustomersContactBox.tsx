import { Box, Collapse, ListItemButton, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query";
import { customer, TActivateCustomer } from "src/api";
import {
  AutoCompleteBase,
  DeleteButton,
  FormSelect,
} from "~modules-core/components";
import { accountStatus } from "~modules-core/constance";
import { toast } from "~modules-core/toast";
import { CustomersBill } from "./CustomersBill";
import { CustomersCurator } from "./CustomersCurator";
import { CustomersReceiver } from "./CustomersReceiver";

type TProps = {
  isDisable: boolean;
  type: string;
  index: number;
  handleRemove: (index: number) => void;
};

export const CustomersContactBox: React.FC<TProps> = ({
  type,
  isDisable,
  index,
  handleRemove,
}) => {
  const [status, setStatus] = useState<number>();

  const [collapses, setCollapses] = useState<number[]>([0]);

  const firstRenderRef = useRef<boolean>(true);

  const { watch } = useFormContext();

  const initStatus = watch(`curatorCreate.${index}.status`);

  const id = watch(`curatorCreate.${index}.id`);

  // METHODS
  const handleCollapse = useCallback(
    (index: number) => {
      collapses.includes(index)
        ? setCollapses((prev) => prev.filter((i) => i !== index))
        : setCollapses([...collapses, index]);
    },
    [collapses]
  );

  const updateStatusMutation = useMutation(
    (payload: TActivateCustomer) => customer.updateStatus(payload),
    {
      onSuccess: (data: any) => {
        toast.success(data?.resultMessage);
      },
    }
  );

  const handleUpdateStatus = async (id: string, status: number) => {
    setStatus(status);

    await updateStatusMutation.mutateAsync({ id, status });
  };

  // SIDE EFFECTS
  useEffect(() => {
    firstRenderRef.current = false;
  }, []);

  useEffect(() => {
    setStatus(initStatus);
  }, [initStatus]);

  return (
    <Box className="!border-grey-2 !rounded-[4px] mb-2">
      <Box className="border-0 border-b-2 flex border-solid border-[#e9e9e9] mb-3 pt-3">
        <ListItemButton
          component="fieldset"
          onClick={() => handleCollapse(index)}
        >
          <Typography className="font-semibold w-full">{`Thông tin liên hệ ${
            index + 1
          }`}</Typography>

          {index > 0 && (
            <DeleteButton color="error" onClick={() => handleRemove(index)} />
          )}
        </ListItemButton>

        {type === "View" && (
          <AutoCompleteBase
            onChange={val => handleUpdateStatus(id, val)}
            value={status}
            options={accountStatus}
            label="Trạng thái tài khoản"
            className="min-w-[200px]"
            labelKey="label"
            valueKey="value"
            shrinkLabel
          />
        )}
      </Box>

      <Collapse
        in={collapses.includes(index)}
        timeout="auto"
        unmountOnExit
        className="w-full"
      >
        <CustomersCurator isDisable={isDisable} index={index} />

        <CustomersReceiver type={type} isDisable={isDisable} index={index} />

        <CustomersBill type={type} isDisable={isDisable} index={index} />
      </Collapse>
    </Box>
  );
};
