import { Box } from "@mui/material";
import { useCallback, useState } from "react";
import { customer } from "src/api";
import { CustomersDialog } from "~modules-dashboard/components";
import { TDefaultDialogState } from "~types/dialog";
import { TAutocompleteAsync } from "~types/form-controlled/form-select";
import { TControllerProps } from "~types/react-hook-form";
import { AddButton } from "./buttons";
import { FormSelectAsync } from "./form-hooks";

type TProps = {
  controlProps: TControllerProps;
  label?: string;
  labelKey?: string;
  disabled?: boolean;
  callback?: (opt: any) => void;
  defaultValue?: any;
  onAddCallback?: (opt: any) => void;
  shrinkLabel?: boolean;
  fetcherParams?: object;
};

export const FormCustomer: React.FC<TProps> = ({
  controlProps,
  label = "Mã khách hàng",
  labelKey = "customerCode",
  disabled = false,
  callback,
  onAddCallback,
  defaultValue,
  shrinkLabel = false,
  fetcherParams
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
          fetcherParams={fetcherParams}
          className="w-full"
          disabled={disabled}
          callback={callback}
          shrinkLabel
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
        type="QuickCreate"
        defaultValue={defaultValue}
        onAddCallback={onAddCallback}
      />
    </>
  );
};
