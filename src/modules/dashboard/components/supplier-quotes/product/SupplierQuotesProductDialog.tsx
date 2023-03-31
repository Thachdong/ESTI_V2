import { Box } from "@mui/material";
import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { askPrice } from "src/api";
import { Dialog } from "~modules-core/components";
import { TDialog } from "~types/dialog";
import { SupplierQuotesProductButtons } from "./SupplierQuotesProductButtons";
import { SupplierQuotesProductDetail } from "./SupplierQuotesProductDetail";
import { SupplierQuotesProductSupplier } from "./SupplierQuotesProductSupplier";
import { SupplierQuotesProductType } from "./SupplierQuotesProductType";

export const SupplierQuotesProductDialog: React.FC<TDialog> = ({
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
    type === "Add"
      ? "Tạo mới sản phẩm cần hỏi giá"
      : type === "View" && isUpdate
      ? "Cập nhật sản phẩm cần hỏi giá"
      : "Thông tin sản phẩm cần hỏi giá";

  // DATA FETCHING
  const { data: detailData } = useQuery(
    ["productDetail", defaultValue?.id],
    () =>
      askPrice.getById(defaultValue?.id as string).then((res) => res.data),
    {
      enabled: !!defaultValue?.id,
    }
  );

  // SIDE EFFECTS
  useEffect(() => {
    if (type === "Add") {
      reset({});
    } else {
      const {price, productId, productStatus, quantity, requirement, supplierId, totalPrice, note, vat, id} = detailData || {};

      reset({price, productId, productStatus, quantity, requirement, supplierId, totalPrice, note, vat, id})
    }
  }, [detailData, defaultValue?.id, type]);

  return (
    <Dialog onClose={onClose} open={open} maxWidth="lg" title={title}>
      <FormProvider {...method}>
        <Box component="form" onSubmit={(e: any) => e.preventDefault()}>
          <SupplierQuotesProductType disabled={disabled} />
          
          <SupplierQuotesProductSupplier disabled={disabled} />

          <SupplierQuotesProductDetail disabled={disabled} type={type as string} />

          <Box className="flex items-center justify-end mt-6">
            <SupplierQuotesProductButtons
              type={type as string}
              isUpdate={isUpdate}
              setIsUpdate={setIsUpdate}
              onClose={onClose}
              refetch={refetch}
              status={defaultValue?.status || 0}
            />
          </Box>
        </Box>
      </FormProvider>
    </Dialog>
  );
};