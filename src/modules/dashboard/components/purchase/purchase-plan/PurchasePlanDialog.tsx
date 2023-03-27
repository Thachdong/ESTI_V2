import { Box } from "@mui/material";
import _ from "lodash";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { purchasePlan } from "src/api";
import { Dialog } from "~modules-core/components";
import { TDialog } from "~types/dialog";
import { PurchasePlanButtons } from "./PurchasePlanButtons";
import { PurchasePlanCustomer } from "./PurchasePlanCustomer";
import { PurchasePlanGeneral } from "./PurchasePlanGeneral";
import { PurchasePlanProduct } from "./PurchasePlanProduct";

export const PurchasePlanDialog: React.FC<TDialog> = ({
  onClose,
  open,
  defaultValue,
  type,
  refetch,
}) => {
  // LOCAL STATE AND EXTRACT PROPS
  const [isUpdate, setIsUpdate] = useState(false);

  const disabled = !isUpdate && type === "View";

  const method = useForm<any>({
    mode: "onBlur",
  });

  const { reset } = method;

  const title =
    type === "Add" || type === "Clone"
      ? "Tạo mới sản phẩm cần mua"
      : type === "View" && isUpdate
      ? "Cập nhật sản phẩm cần mua"
      : "Thông tin sản phẩm cần mua";

  // DATA FETCHING
  const { data: detailData } = useQuery(
    ["DetailData", defaultValue?.id],
    () =>
      purchasePlan.getById(defaultValue?.id as string).then((res) => res.data),
    {
      enabled: !!defaultValue?.id,
    }
  );

  // SIDE EFFECTS
  useEffect(() => {
    if (type === "Add") {
      reset({});
    } else {
      const {
        branchId,
        supplierId,
        productId,
        vat,
        price,
        quantity,
        note,
        id,
      } = detailData?.needToBuy || {};

      reset({
        branchId,
        supplierId,
        productId,
        vat,
        price,
        quantity,
        note,
        id,
      });
    }
  }, [detailData, defaultValue?.id, type]);

  return (
    <Dialog onClose={onClose} open={open} maxWidth="lg" title={title}>
      <FormProvider {...method}>
        <Box component="form" onSubmit={(e: any) => e.preventDefault()}>
          <PurchasePlanGeneral disabled={disabled} />

          <PurchasePlanCustomer
            disabled={disabled}
            type={type as string}
            defaultSupplier={!!detailData?.needToBuy?.supplierId}
          />

          <PurchasePlanProduct disabled={disabled} type={type as string} />

          <Box className="flex items-center justify-end mt-6">
            <PurchasePlanButtons
              type={type as string}
              isUpdate={isUpdate}
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
