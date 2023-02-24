import { Box, ButtonBase } from "@mui/material";
import { useCallback, useState } from "react";
import { customer } from "src/api";
import { CustomersDialog } from "~modules-dashboard/components";
import { TDefaultDialogState } from "~types/dialog";
import { TControllerProps } from "~types/react-hook-form";
import { AddButton } from "./buttons";
import { FormSelectAsync } from "./form-hooks";
import AddIcon from "@mui/icons-material/Add";

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
  callback,
}) => {
  const [dialog, setDialog] = useState<TDefaultDialogState>();

  const onClose = useCallback(() => {
    setDialog({ open: false });
  }, []);

  const onOpen = useCallback(() => {
    setDialog({ open: true, type: "Add" });
  }, []);
  return (
    <>
      <Box className="flex items-center w-full">
        <FormSelectAsync
          controlProps={controlProps}
          label={label}
          fetcher={customer.getList}
          labelKey={labelKey}
          getOptionLabel={(customer: any) =>
            !!customer
              ? customer?.customerCode + " - " + customer?.companyName
              : ""
          }
          className="w-full"
          disabled={disabled}
          callback={callback}
        />

        <AddButton
          disabled={disabled}
          onClick={onOpen}
          className="!w-[32px] ml-2 !min-w-[40px]"
        />
      </Box>
      <CustomersDialog
        onClose={onClose}
        open={!!dialog?.open}
        type={dialog?.type}
      />
    </>
  );
};
