import { Box, ButtonBase, List, ListItem, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import { customer, staff, stockPlan, TCreateStockPlan, TUpdateStockPlan } from "src/api";
import {
  AddButton,
  BaseButton,
  DeleteButton,
  Dialog,
  FormDatepicker,
  FormDatepickerBase,
  FormInputBase,
  FormInputNumber,
  FormInputNumberBase,
  FormSelect,
  FormSelectAsync,
} from "~modules-core/components";
import { TDialog } from "~types/dialog";
import { useMutation, useQuery } from "react-query";
import { toast } from "~modules-core/toast";
import moment from "moment";
import { useSession } from "~modules-core/customHooks/useSession";

type TProps = TDialog & {
  product: {
    code: string;
    name: string;
    id: string;
  };
};

export const StockDialog: React.FC<TProps> = ({
  refetch,
  open,
  onClose,
  defaultValue,
  type,
  product,
}) => {
  const {
    control,
    handleSubmit,
    formState: { isDirty },
    watch,
    reset,
  } = useForm();

  // roleCodeL:
  // admin: AD
  // sale: NV
  const { roleCode, userId } = useSession()?.userInfo?.userInfo || {};

  const { append, remove } = useFieldArray<any>({
    control,
    name: "estimatedQuantity",
  });

  const estimatedQuantity = watch("estimatedQuantity") || [];

  const title = type === "Add" ? "Tạo stock hàng" : "Cập nhật stock hàng";

  // DATA FETCHING
  const { data: saleList } = useQuery(
    ["SaleList"],
    () => staff.getListSale().then((res) => res.data),
    {
      enabled: roleCode !== "NV",
    }
  );

  // METHODS
  const mutateCreate = useMutation(
    (payload: TCreateStockPlan) => stockPlan.create(payload),
    {
      onSuccess: (data: any) => {
        toast.success(data?.resultMessage);

        refetch?.();

        onClose();

        reset({});
      },
    }
  );

  const handleCreate = useCallback(
    async (data: any) => {
      let userId = "";

      const planList = data?.estimatedQuantity?.map?.((p: any) => ({
        ...p,
        time: moment(p?.time).endOf("month").valueOf(),
      }));

      const payload = {
        warehouseConfigProductId: product?.id,
        salesId: data?.salesId || userId,
        customerId: data?.customerId,
        estimatedQuantity: planList || [],
      };

      await mutateCreate.mutateAsync(payload);
    },
    [roleCode, userId]
  );

  const mutateUpdate = useMutation(
    (payload: TUpdateStockPlan) => stockPlan.update(payload),
    {
      onSuccess: (data: any) => {
        toast.success(data?.resultMessage);

        refetch?.();

        onClose();

        reset({});
      },
    }
  );

  const handleUpdate = useCallback(
    async (data: any) => {
      let userId = "";

      const planList = data?.estimatedQuantity?.map?.((p: any) => ({
        ...p,
        time: moment(p?.time).endOf("month").valueOf(),
      }));

      const payload = {
        id: data?.id,
        salesId: data?.salesId || userId,
        customerId: data?.customerId,
        estimatedQuantity: planList || [],
      };

      await mutateUpdate.mutateAsync(payload);
    },
    [roleCode, userId]
  );

  // SIDE EFFECTS
  useEffect(() => {
    if (type === "Add") {
      append({ time: "", estimatedQuantity: "" });
    }
  }, [type]);

  useEffect(() => {
    if (type === "Update" && !!defaultValue) {
      const { id, customerId, salesId, estimatedQuantity } = defaultValue;

      let planList: any[] = [];

      try {
        planList = JSON.parse(estimatedQuantity) || [];
      } catch (error) {
        console.log(error);
      }

      console.log(estimatedQuantity, planList);

      reset({
        id,
        customerId,
        salesId,
        estimatedQuantity: planList,
      });
    }
  }, [type, defaultValue]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      title={title}
      headerClassName="text-center"
    >
      <Box className="grid gap-4">
        <FormInputBase
          label="Sản phẩm:"
          value={product.code + " - " + product.name}
          disabled
          shrinkLabel
        />

        {roleCode !== "NV" && (
          <FormSelect
            label="Nhân viên sale"
            controlProps={{
              control,
              name: "salesId",
              rules: { required: "Phải chọn sale" },
            }}
            options={saleList || []}
            shrinkLabel
            getOptionLabel={(opt: any) =>
              !!opt ? `${opt.code} - ${opt.fullName}` : ""
            }
          />
        )}

        <FormSelectAsync
          controlProps={{
            control,
            name: "customerId",
            rules: { required: "Phải chọn khách hàng" },
          }}
          label={"Chọn khách hàng"}
          fetcher={customer.getList}
          getOptionLabel={(opt: any) =>
            !!opt ? `${opt.customerCode} - ${opt.companyName}` : ""
          }
          shrinkLabel
        />

        <Box
          className="w-full flex justify-between items-center"
          component="fieldset"
        >
          <legend className="flex items-center">
            <Typography>Kế hoạch</Typography>

            <ButtonBase
              onClick={() => append({ time: "", estimatedQuantity: "" })}
              className="bg-main text-white rounded-sm w-[28px] h-[28px] ml-3"
            >
              <AddIcon />
            </ButtonBase>
          </legend>

          <List>
            {estimatedQuantity.map((_: any, index: number) => (
              <ListItem key={index} className="flex px-0">
                <FormInputNumber
                  controlProps={{
                    control,
                    name: `estimatedQuantity.[${index}].estimatedQuantity`,
                    rules: { required: "Phải nhập số lượng" },
                  }}
                  label="Số lượng:"
                  shrinkLabel
                  className="w-1/2 mr-4"
                />

                <FormDatepicker
                  controlProps={{
                    control,
                    name: `estimatedQuantity.[${index}].time`,
                    rules: { required: "Phải chọn thời gian" },
                  }}
                  label="Thời gian:"
                  inputFormat="MM/YYYY"
                  views={["month", "year"]}
                  className="w-1/2"
                />

                {index > 0 && (
                  <DeleteButton
                    onClick={() => remove(index)}
                    className="text-error min-w-[24px] ml-2"
                  />
                )}
              </ListItem>
            ))}
          </List>
        </Box>

        <Box className="flex justify-end">
          {type === "Add" ? (
            <BaseButton
              disabled={!isDirty}
              onClick={handleSubmit(handleCreate)}
            >
              Tạo
            </BaseButton>
          ) : (
            <BaseButton onClick={handleSubmit(handleUpdate)}>Cập nhật</BaseButton>
          )}
        </Box>
      </Box>
    </Dialog>
  );
};
