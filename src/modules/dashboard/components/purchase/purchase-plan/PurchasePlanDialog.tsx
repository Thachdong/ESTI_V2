import { Box } from "@mui/material";
import _ from "lodash";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Dialog } from "~modules-core/components";
import { TDialog } from "~types/dialog";
import { PurchasePlanButtons } from "./PurchasePlanButtons";
import { PurchasePlanCustomer } from "./PurchasePlanCustomer";
import { PurchasePlanGeneral } from "./PurchasePlanGeneral";
import { PurchasePlanProduct } from "./PurchasePlanProduct";

type THookForm = {
  branchId?: string;
  supplierId?: string;
  products: any[];
};

export const PurchasePlanDialog: React.FC<TDialog> = ({
  onClose,
  open,
  defaultValue,
  type,
  refetch,
}) => {
  // LOCAL STATE AND EXTRACT PROPS
  const [isUpdate, setIsUpdate] = useState(false);

  const method = useForm<THookForm>({
    mode: "onBlur",
  });

  const { reset } = method;

  const title =
    type === "Add" || type === "Clone"
      ? "Tạo mới sản phẩm cần mua"
      : type === "View" && isUpdate
      ? "Cập nhật sản phẩm cần mua"
      : "Thông tin sản phẩm cần mua";

  // SIDE EFFECTS
  useEffect(() => {
    if (type === "Add") {
      reset({});
    } else {
      reset({ ...defaultValue });
    }
  }, [defaultValue]);

  return (
    <Dialog onClose={onClose} open={open} maxWidth="lg" title={title}>
      <FormProvider {...method}>
        <Box component="form" onSubmit={(e: any) => e.preventDefault()}>
          <PurchasePlanGeneral />

          <PurchasePlanCustomer />

          <PurchasePlanProduct />

          <Box className="flex items-center justify-end mt-6">
            <PurchasePlanButtons
              type={type as string}
              isUpdate={false}
              setIsUpdate={setIsUpdate}
              onClose={onClose}
              refetch={refetch}
            />
          </Box>
        </Box>
      </FormProvider>
    </Dialog>
  );
};
