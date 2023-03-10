import { Box } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import {
  accountManagement,
  categoryTransaction,
  customer,
  suppliers,
  TCreateTransaction,
  transaction,
} from "src/api";
import {
  BaseButton,
  Dialog,
  FormInput,
  FormInputBase,
  FormInputNumber,
  FormSelect,
  FormSelectAsync,
} from "~modules-core/components";
import { toast } from "~modules-core/toast";
import { TDialog } from "~types/dialog";

export const TransactionDialog: React.FC<TDialog> = ({
  onClose,
  open,
  type,
  defaultValue,
  refetch,
}) => {
  console.log(defaultValue);

  const { control, watch, reset, handleSubmit } = useForm();

  const { partnerGroup, transactionGroup } = watch();

  const title =
    type === "Add" ? "Thêm phiên giao dịch" : "Chi tiết phiên giao dịch";

  // SIDE EFFECTS
  useEffect(() => {
    if (type === "Add") {
      reset({});
    } else {
      const {
        accountManagementId,
        partner,
        categoryTransactionId,
        billNumber,
        owe,
        moneyCollect,
        explain,
      } = defaultValue || {};
      reset({
        accountManagementId,
        partner,
        categoryTransactionId,
        billNumber,
        owe,
        moneyCollect,
        explain,
      });
    }
  }, [type, defaultValue]);

  // DATA FETCHING
  const { data: categoryTransactionList } = useQuery(
    ["categoryTransactionList"],
    () =>
      categoryTransaction
        .getList({ pageIndex: 1, pageSize: 9999 })
        .then((res) => res.data.items)
  );

  // METHODS
  const categoryOptions = useMemo(() => {
    return (
      categoryTransactionList?.filter((trans: any) => {
        if (transactionGroup === 1) {
          return trans?.type === 1;
        } else {
          return trans?.type === 2;
        }
      }) || []
    );
  }, [categoryTransactionList, transactionGroup]);

  const mutateAdd = useMutation(
    (payload: TCreateTransaction) => transaction.create(payload),
    {
      onSuccess: (data: any) => {
        toast.success(data?.resultMessage);

        reset({});

        refetch?.();

        onClose();
      },
    }
  );

  const handleCreate = useCallback(async (data: any) => {
    console.log(data);
    const { customerId, supplierId, transactionGroup, partnerGroup, ...rest } =
      data || {};

    let partner = "";

    switch (partnerGroup) {
      case 1:
        partner = customerId;
        break;
      case 2:
        partner = supplierId;
        break;
      default:
        toast.error("Phải chọn đối tác!");
        return;
    }

    const payload = {
      ...rest,
      partner,
    };

    await mutateAdd.mutateAsync(payload);
  }, []);

  const renderTagsBaseOnType = useCallback(() => {
    if (type === "Add") {
      return (
        <>
          <FormSelect
            controlProps={{
              control,
              name: "partnerGroup",
              rules: { required: "Phải chọn nhóm đối tác" },
            }}
            label="Chọn nhóm đối tác"
            options={[
              { id: 1, name: "Khách hàng" },
              { id: 2, name: "Nhà cung cấp" },
            ]}
          />

          {partnerGroup === 1 ? (
            <FormSelectAsync
              controlProps={{
                control,
                name: "customerId",
                rules: { required: "Phải chọn đối tác" },
              }}
              label="Chọn đối tác"
              fetcher={customer.getList}
              getOptionLabel={(opt) =>
                !!opt ? `${opt?.customerCode} - ${opt?.companyName}` : ""
              }
              disabled={!partnerGroup}
            />
          ) : (
            <FormSelectAsync
              controlProps={{
                control,
                name: "supplierId",
                rules: { required: "Phải chọn đối tác" },
              }}
              label="Chọn đối tác"
              fetcher={suppliers.getList}
              getOptionLabel={(opt) =>
                !!opt ? `${opt?.supplierCode} - ${opt?.supplierName}` : ""
              }
              disabled={!partnerGroup}
            />
          )}

          <FormSelect
            controlProps={{
              control,
              name: "transactionGroup",
              rules: { required: "Phải chọn nhóm danh mục" },
            }}
            label="Chọn nhóm danh mục giao dịch"
            options={[
              { id: 1, name: "INCOME" },
              { id: 2, name: "EXPENSE" },
            ]}
          />

          <FormSelect
            controlProps={{
              control,
              name: "categoryTransactionId",
              rules: { required: "Phải chọn danh mục giao dịch" },
            }}
            label="Chọn danh mục giao dịch"
            labelKey="categoryName"
            options={categoryOptions}
          />
        </>
      );
    } else {
      return (
        <>
          <FormInputBase
            value={`${defaultValue?.partnerCode} - ${defaultValue?.partnerName}`}
            label="Đối tác"
            disabled
          />

          <FormInputBase
            value={defaultValue?.categoryName}
            label="Danh mục giao dịch"
            disabled
          />
        </>
      );
    }
  }, [type, partnerGroup, categoryOptions, defaultValue]);

  return (
    <Dialog onClose={onClose} open={open} maxWidth="sm" title={title}>
      <Box className="grid gap-4">
        <FormSelectAsync
          controlProps={{
            control,
            name: "accountManagementId",
            rules: { required: "Phải chọn tài khoản" },
          }}
          label="Chọn tài khoản"
          fetcher={accountManagement.getList}
          labelKey="account"
          disabled={type === "View"}
        />

        {renderTagsBaseOnType()}

        <FormInput
          controlProps={{
            control,
            name: "billNumber",
            rules: { required: "Phải nhập số hoá đơn" },
          }}
          label="Số hoá đơn"
          disabled={type === "View"}
        />

        <FormInputNumber
          controlProps={{
            control,
            name: "owe",
            rules: { required: "Phải nhập giá trị" },
          }}
          label="Nợ"
          disabled={type === "View"}
        />

        <FormInputNumber
          controlProps={{
            control,
            name: "moneyCollect",
            rules: { required: "Phải nhập giá trị" },
          }}
          label="Tiền thu vào"
          disabled={type === "View"}
        />

        <FormInput
          controlProps={{
            control,
            name: "explain",
            rules: { required: "Phải nhập diễn giải" },
          }}
          label="Diễn giải"
          multiline
          minRows={3}
          disabled={type === "View"}
        />
      </Box>

      <Box className="flex items-center justify-end mt-4">
        {type === "Add" && (
          <BaseButton onClick={handleSubmit(handleCreate)} className="mr-2">
            Tạo
          </BaseButton>
        )}
        <BaseButton type="button" className="!bg-main-1" onClick={onClose}>
          Đóng
        </BaseButton>
      </Box>
    </Dialog>
  );
};
