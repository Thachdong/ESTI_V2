import { Box } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import UpdateIcon from "@mui/icons-material/BorderColorRounded";
import { BaseButton, PrintButton } from "~modules-core/components";
import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";
import { toast } from "~modules-core/toast";
import { useMutation } from "react-query";
import {
  TCreateExportWarehouse,
  TCreateExportWarehouseProduct,
  warehouse,
} from "src/api";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { PrintExportDetail } from "~modules-dashboard/components";

type TProps = {
  orderData: any;
  exportStatus?: number;
  transactionData: any;
};

export const ExportDetailButtonsBox: React.FC<TProps> = ({
  orderData,
  exportStatus,
  transactionData,
}) => {
  // EXTRACT PROPS
  const router = useRouter();

  const { query } = router;

  const { handleSubmit } = useFormContext();

  // METHODS
  const createMutation = useMutation(
    (data: TCreateExportWarehouse) => warehouse.createExportWarehouse(data),
    {
      onError: (error: any) => {
        toast.error(error?.resultMessage);
      },
      onSuccess: (data) => {
        toast.success(data.resultMessage);

        router.push("/dashboard/warehouse/warehouse-export");
      },
    }
  );

  const mutateUpdate = useMutation(
    (data: any) => warehouse.updateTransaction(data),
    {
      onSuccess: (data) => {
        toast.success(data.resultMessage);
      },
    }
  );

  const handleCreate = async (data: any) => {

    const productList: TCreateExportWarehouseProduct[] = data.productList?.map(
      (prod: any) => {
        return {
          productId: prod?.productId,
          lotNumber: prod?.lotNumber,
          dateManufacture: prod?.dateManufacture,
          dateExpiration: prod?.dateExpiration,
          quantity: prod?.quantity,
          price: prod?.price || 0,
          vat: prod?.vat || 0,
          positionId: prod?.positionId,
        };
      }
    );

    // 2. CALL API
    const { paymentDocument, isForDelete, isDefaultReceiver, productList: _, ...restData } = data;

    let payload: any;

    if (isForDelete) {
      payload = {
        exportWarehouseCreate: productList,
        branchId: data.branchId,
        deliveryId: data.deliveryId,
      };
    } else {
      payload = {
        ...restData,
        paymentDocument: paymentDocument.join(","),
        exportWarehouseCreate: productList,
        branchId: orderData.branchId,
        deliveryId: orderData.deliveryId,
      };
    }

    await createMutation.mutateAsync(payload);
  };

  const handleUpdateProducts = async (data: any) => {
    const {
      productList,
      id,
      codeVD,
      deliveryUnit,
      packageNumber,
      packageWeight,
      shippingFee,
      note,
    } = data;

    const payload = {
      warehouseUpdate: productList,
      id,
      codeVD,
      deliveryUnit,
      packageNumber,
      packageWeight,
      shippingFee,
      note,
    };

    await mutateUpdate.mutateAsync(payload);
  };

  const printAreaRef = useRef<HTMLTableElement>(null);
  const handlePrint = useReactToPrint({
    content: () => printAreaRef.current,
    pageStyle: `
      @page {
        size: 210mm 297mm;
      }
    `,
  });

  return (
    <Box className="flex justify-end my-4">
      {!query.id ? (
        <BaseButton
          type="button"
          onClick={handleSubmit(handleCreate)}
          className="bg-main"
        >
          <SaveIcon className="mr-2" />
          Lưu
        </BaseButton>
      ) : (
        <Box className="flex justify-end">
          <BaseButton
            type="button"
            className="mr-3 bg-main"
            onClick={handleSubmit(handleUpdateProducts)}
            disabled={exportStatus !== undefined && exportStatus > 0}
          >
            <UpdateIcon className="mr-2" />
            Cập nhật
          </BaseButton>

          <PrintButton className="bg-error" onClick={handlePrint}>
            In{" "}
          </PrintButton>
          <Box className="hidden">
            <PrintExportDetail
              printAreaRef={printAreaRef}
              defaultValue={transactionData}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};
