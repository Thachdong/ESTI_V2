import { Box, Paper, Typography } from "@mui/material";
import _ from "lodash";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { branchs, suppliers } from "src/api";
import {
  BaseButton,
  Dialog,
  FormInputBase,
  FormSelectAsync,
} from "~modules-core/components";
import { productTypes } from "~modules-core/constance";
import { TDialog } from "~types/dialog";
import { PurchasePlanTable } from "./PurchasePlanTable";

type THookForm = {
  branchId?: string;
  supplierId?: string;
  products: any[];
};

export const PurchasePlanDialog: React.FC<TDialog> = ({
  onClose,
  refetch,
  open,
  defaultValue,
  type,
}) => {
  // LOCAL STATE AND EXTRACT PROPS
  const [isUpdate, setIsUpdate] = useState(false);

  const [supplier, setSupplier] = useState<any>();

  const method = useForm<THookForm>({
    mode: "onBlur",
    defaultValues: {
      products: [],
    },
  });

  const { control, handleSubmit, reset } = method;

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
      reset({...defaultValue});
    }
  }, [defaultValue])

  // DOM UTILITY
  const renderButtons = () => {
    switch (true) {
      case type === "Add":
        return (
          <>
            <BaseButton className="mr-2">Lưu</BaseButton>
            <BaseButton type="button" className="!bg-main-1" onClick={onClose}>
              Đóng
            </BaseButton>
          </>
        );
      case type === "View" && isUpdate === false:
        return (
          <>
            <BaseButton
              type="button"
              className="mr-2"
              onClick={() => setIsUpdate(true)}
            >
              Cập nhật
            </BaseButton>
            <BaseButton type="button" className="!bg-main-1" onClick={onClose}>
              Đóng
            </BaseButton>
          </>
        );
      case type === "View" && isUpdate === true:
        return (
          <>
            <BaseButton
              onClick={handleSubmit((data) => console.log("cập nhật"))}
              className="mr-2"
            >
              Cập nhật
            </BaseButton>
            <BaseButton
              type="button"
              className="!bg-main-1"
              onClick={() => setIsUpdate(false)}
            >
              Quay lại
            </BaseButton>
          </>
        );
    }
  };

  const getProductSupply = (data: string) => {
    if (!data) return;

    const productKeys = data?.split(",");

    const products = productKeys
      .map((key: string) =>
        productTypes.find((type) => type.id.toString() === key)
      )

    return _.compact(products).map(prod => prod.name).join(", ")
  };

  return (
    <Dialog
      onClose={onClose}
      open={open}
      maxWidth="lg"
      title={title}
      headerClassName="text-center"
    >
      <FormProvider {...method}>
        <Box component="form" onSubmit={(e: any) => e.preventDefault()}>
          <Paper className="p-4 mb-4">
            <Typography className="font-semibold text-sm mb-2">
              THÔNG TIN CHUNG
            </Typography>
            <Box className="grid grid-cols-2 gap-4">
              <FormSelectAsync
                fetcher={branchs.getList}
                controlProps={{
                  name: "branchId",
                  control,
                }}
                label="Chọn chi nhánh"
                labelKey="code"
              />
            </Box>
          </Paper>

          <Box className="grid grid-cols-2 gap-4">
            <Paper className="p-4 mb-4">
              <Typography className="font-semibold text-sm mb-2">
                THÔNG TIN NHÀ CUNG CẤP
              </Typography>
              <Box className="grid gap-4">
                <FormSelectAsync
                  fetcher={suppliers.getList}
                  controlProps={{
                    name: "supplierId",
                    control,
                  }}
                  callback={(opt) => setSupplier(opt)}
                  label="Chọn nhà cung cấp"
                  labelKey="supplierCode"
                />

                <FormInputBase
                  value={getProductSupply(supplier?.productSupply)}
                  label="Nhóm sản phẩm cung cấp"
                  disabled
                />

                <FormInputBase
                  value={supplier?.taxCode}
                  label="Mã số thuế"
                  disabled
                />

                <FormInputBase
                  value={supplier?.address}
                  label="Địa chỉ"
                  multiline
                  minRows={2}
                  disabled
                />
              </Box>
            </Paper>

            <Paper className="p-4 mb-4">
              <Typography className="font-semibold text-sm mb-2">
                THÔNG TIN LIÊN HỆ
              </Typography>
              <Box className="grid gap-4">
                <FormInputBase value={supplier?.curatorName} label="Người phụ trách" disabled />

                <FormInputBase value={supplier?.curatorPositionName} label="Chức vụ" disabled />

                <FormInputBase value={supplier?.curatorPhone} label="Điện thoại" disabled />

                <FormInputBase value={supplier?.curatorEmail} label="Email" disabled />
              </Box>
            </Paper>
          </Box>

          <PurchasePlanTable />

          <Box className="flex items-center justify-end mt-4">
            {renderButtons()}
          </Box>
        </Box>
      </FormProvider>
    </Dialog>
  );
};
