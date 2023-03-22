import { Box } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { branchs, labelHistory, stamp } from "src/api";
import {
  Dialog,
  FormInputBase,
  FormSelectAsync,
  PrintButton,
} from "~modules-core/components";
import { TDefaultDialogState, TDialog } from "~types/dialog";
import { PrintStampDialog } from "./PrintStampDialog";

export const StampDetailDialog: React.FC<TDialog> = ({
  onClose,
  open,
  defaultValue,
}) => {
  const [dialog, setDialog] = useState<TDefaultDialogState>({ open: false });

  const title = "Thông tin nhãn sản phẩm";

  const { id: warehouseSessionId } = useRouter().query;

  const methods = useForm<any>({
    mode: "onBlur",
  });

  const { control, watch } = methods;

  const { branch, branchAddress } = watch();

  const { productLabelId, lotNumber, manufactor, specs } = defaultValue || {};

  // DATA FETCHING
  const { data: stampDetail } = useQuery(
    ["StampDetail", productLabelId],
    () => stamp.getById(productLabelId).then((res) => res.data),
    {
      enabled: !!productLabelId,
    }
  );

  const { data: stampHistoryDetail, refetch: refetchStampHistory } = useQuery(
    ["StampHistory", productLabelId, lotNumber],
    () =>
      labelHistory
        .getList({
          pageSize: 20,
          pageIndex: 1,
          productLabelId: productLabelId,
          lotNumber,
        })
        .then((res) => res.data?.items as any),
    {
      enabled: !!productLabelId && !!lotNumber,
    }
  );

  const { QRCode, dateExpiration, dateManufacture } =
    stampHistoryDetail?.[0] || {};

  // METHODS
  const handleCreateLabelHistory = useCallback(async () => {
    const historyLength = stampHistoryDetail?.length;

    if (historyLength === 0) {
      // create stamp history
      const payload = {
        productLabelId: productLabelId as string,
        lotNumber,
        warehouseSessionId: warehouseSessionId as string,
        quantity: defaultValue?.quantity,
        positionId: defaultValue?.positionId,
        dateManufacture: defaultValue?.dateManufacture,
        dateExpiration: defaultValue?.dateExpiration,
      };

      try {
        await labelHistory.create({ labelHistoryCreate: payload });
      } finally {
        refetchStampHistory();
      }
    }
  }, [stampHistoryDetail, defaultValue]);

  const handleClose = useCallback(() => {
    setDialog({ open: false });
  }, []);

  const handleOpen = useCallback(() => {
    setDialog({ open: true });
  }, []);

  // SIDE EFFECTS
  useEffect(() => {
    handleCreateLabelHistory();
  }, [stampHistoryDetail, defaultValue]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" title={title}>
      <FormProvider {...methods}>
        <Box component="form">
          <Box className="grid grid-cols-2 gap-4">
            <Box className="grid grid-cols-1 gap-4">
              <FormInputBase
                label="Nhóm sản phẩm"
                value={stampDetail?.labelTypeName}
                shrinkLabel
                disabled
              />

              <FormInputBase
                label="Mã sản phẩm"
                value={stampDetail?.productCode}
                shrinkLabel
                disabled
              />

              <FormInputBase
                label="Tên sản phẩm"
                value={stampDetail?.productName}
                shrinkLabel
                disabled
              />

              <FormInputBase
                label="Mã CAS"
                value={stampDetail?.casCode}
                shrinkLabel
                disabled
              />

              <FormInputBase
                label="Công thức hóa học"
                value={stampDetail?.chemicalName}
                shrinkLabel
                disabled
              />

              <FormInputBase
                label="Ngày sản xuất"
                value={
                  !!dateManufacture
                    ? moment(dateManufacture).format("DD/MM/YYYY")
                    : ""
                }
                shrinkLabel
                disabled
              />

              <FormInputBase
                label="Hạn sử dụng"
                value={
                  !!dateExpiration
                    ? moment(dateExpiration).format("DD/MM/YYYY")
                    : ""
                }
                shrinkLabel
                disabled
              />

              <FormSelectAsync
                controlProps={{
                  control,
                  name: "branch",
                }}
                label="Nhà nhập khẩu"
                labelKey="name"
                valueKey="name"
                fetcher={branchs.getList}
                shrinkLabel
              />

              <FormSelectAsync
                controlProps={{
                  control,
                  name: "branchAddress",
                }}
                label="Địa chỉ"
                labelKey="address"
                valueKey="address"
                fetcher={branchs.getList}
                shrinkLabel
              />
            </Box>

            <Box>
              <FormInputBase
                label="LOT#"
                value={lotNumber}
                shrinkLabel
                disabled
                className="mb-4"
              />

              <FormInputBase
                label="Hãng sản xuất"
                value={manufactor}
                shrinkLabel
                className="mb-4"
                disabled
              />

              <FormInputBase
                label="Xuất xứ"
                value={stampDetail?.origin}
                shrinkLabel
                className="mb-4"
                disabled
              />

              <FormInputBase
                label="Quy cách"
                value={specs}
                shrinkLabel
                className="mb-4"
                disabled
              />

              {!!QRCode ? (
                <Box className="flex items-center justify-center">
                  <img className="w-[250px]" src={QRCode} alt="stamp qr code" />
                </Box>
              ) : (
                "Không có QRCode"
              )}
            </Box>
          </Box>

          <Box className="flex justify-end items-center mt-4">
            <PrintButton onClick={handleOpen}>In nhãn</PrintButton>
          </Box>
        </Box>
      </FormProvider>

      <PrintStampDialog
        onClose={handleClose}
        open={dialog.open}
        defaultValue={
          {
            ...defaultValue,
            ...stampDetail,
            QRCode,
            branchName: branch,
            branchAddress,
            labelType: stampDetail?.labelType
          } as any
        }
      />
    </Dialog>
  );
};
