import { Box, Typography } from "@mui/material";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { askPrice } from "src/api";
import { AddButton, DataTable, Dialog, FormSelect } from "~modules-core/components";
import { supplierQuotesProductTypes } from "~modules-core/constance";
import { toast } from "~modules-core/toast";
import { suplierQuotesProductColumns } from "~modules-dashboard/pages/supplier-quotes/product/data";
import { TDialog } from "~types/dialog";

export const AskPriceDialog: React.FC<TDialog> = ({
  open,
  refetch,
  defaultValue,
  onClose,
}) => {
  const { control, handleSubmit } = useForm();

  // DATA FETCHING
  const { data: askPriceList, refetch: askPriceRefetch } = useQuery(
    ["AskPriceList", defaultValue?.productId],
    () =>
      askPrice
        .getByProductId({productId: defaultValue?.productId as string})
        .then((res) => res.data),
    {
      enabled: !!defaultValue?.productId,
    }
  );

  // METHODS
  const mutateCreate = useMutation((payload: any) => askPrice.create(payload), {
    onSuccess: (data: any) => {
        toast.success(data?.resultMessage);

        askPriceRefetch();
    }
  });

  const handleCreate = useCallback(async(data: any) => {
    if (!!defaultValue) {
        const {productId, quantity} = defaultValue;

        const {requirement} = data || {};

        await mutateCreate.mutateAsync([{productId, quantity, requirement}])
    }
  }, [defaultValue])

  return (
    <Dialog
      onClose={onClose}
      open={open}
      maxWidth="md"
      title={`YÊU CẦU HỎI GIÁ - ${defaultValue?.productCode}`}
      headerClassName="text-center"
    >
      <Box className="flex items-center mb-4">
        <FormSelect
          options={supplierQuotesProductTypes}
          controlProps={{
            name: "requirement",
            control,
            rules: {required: "Phải chọn loại yêu cầu"}
          }}
          label="Chọn loại yêu cầu"
          labelKey="label"
          valueKey="value"
          className="w-3/4"
        />
        {/* api yêu cầu: có thể tạo hỏi giá nhiều lần */}
        <AddButton onClick={handleSubmit(handleCreate)} className=" ml-4">Tạo hỏi giá</AddButton>
      </Box>

      <Box>
        <Typography className="font-semibold mb-4">Danh sách hỏi giá</Typography>
      
        <DataTable
          rows={askPriceList?.map((data: any, index: number) => ({...data, no: index + 1})) || []}
          columns={suplierQuotesProductColumns}
          autoHeight
          hideFooter
          hideSearchbar
          getRowId={(row) => row?.no}
        />
      </Box>
    </Dialog>
  );
};
