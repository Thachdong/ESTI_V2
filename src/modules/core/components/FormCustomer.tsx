import { Box } from "@mui/material";
import { useCallback, useState } from "react";
import { customer } from "src/api";
import { CustomersDialog } from "~modules-dashboard/components";
import { TDefaultDialogState } from "~types/dialog";
import { TControllerProps } from "~types/react-hook-form";
import { AddButton } from "./buttons";
import { FormSelectAsync } from "./form-hooks";

type TProps = {
  controlProps: TControllerProps;
  label?: string;
  labelKey?: string;
  disabled?: boolean;
  callback?: (opt: any) => void;
};

export const FormCustomer: React.FC<TProps> = ({
  controlProps,
  label = "Mã khách hàng",
  labelKey = "customerCode",
  disabled = false,
  callback
}) => {
  const [dialog, setDialog] = useState<TDefaultDialogState>();

  const onClose = useCallback(() => {
    setDialog({open: false})
  }, []);

  const onOpen = useCallback(() => {
    setDialog({open: true, type: "Add"})
  }, []);
  return (
    <Box className="flex items-center w-full">
      <FormSelectAsync
        controlProps={controlProps}
        label={label}
        fetcher={customer.getList}
        labelKey={labelKey}
        className="flex-grow"
        disabled={disabled}
        callback={callback}
      />

      <AddButton disabled={disabled} onClick={onOpen} className="min-w-[32px] mb-1 ml-2" />

      <CustomersDialog
        onClose={onClose}
        open={!!dialog?.open}
        type={dialog?.type}
      />
    </Box>
  );
};
