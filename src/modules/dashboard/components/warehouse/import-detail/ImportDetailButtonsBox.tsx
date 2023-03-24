import { Box } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import UpdateIcon from "@mui/icons-material/BorderColorRounded";
import { BaseButton, PrintButton } from "~modules-core/components";
import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";
import {
  TCreateImportWarehouse,
  TCreateImportWarehouseProduct,
  warehouse,
} from "src/api";
import { toast } from "~modules-core/toast";
import { useMutation } from "react-query";
import { PrintImportDetail } from "~modules-dashboard/components";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

type TPayload = {
  importStatus?: 0 | 1 | 2;
  transactionData: any;
  refetch: () => void;
};

export const ImportDetailButtonsBox: React.FC<TPayload> = ({
  importStatus,
  transactionData,
  refetch
}) => {
  const router = useRouter();

  const { query } = router;

  const { handleSubmit } = useFormContext();

  // METHODS
  const mutateCreate = useMutation(
    (data: TCreateImportWarehouse) => warehouse.createImportWarehouse(data),
    {
      onSuccess: (data) => {
        toast.success(data.resultMessage);

        router.push("/dashboard/warehouse/warehouse-import");
      },
    }
  );

  const mutateUpdate = useMutation(
    (data: any) => warehouse.updateTransaction(data),
    {
      onSuccess: (data) => {
        toast.success(data.resultMessage);
        refetch?.();
      },
    }
  );

  const handleValidateProduct = (product: TCreateImportWarehouseProduct) => {
    const { dateExpiration, dateManufacture, lotNumber, positionId } = product;

    let messages: string[] = [];

    switch (true) {
      case !dateExpiration:
        messages.push("chưa nhập hạn sử dụng!");
      case !dateManufacture:
        messages.push("chưa nhập ngày sản xuất!");
      case !lotNumber:
        messages.push("chưa nhập số LOT!");
      case !positionId:
        messages.push("chưa nhập vị trí!");
      case dateManufacture > dateExpiration:
        messages.push("Ngày sản xuất không hợp lệ!");
    }

    return messages.length > 0 ? messages : null;
  };

  const handleCreate = async (data: any) => {
    const { withoutPurchaseInvoice } = data;

    let error: any[] = [];

    const productList: TCreateImportWarehouseProduct[] = data?.productList?.map(
      (product: any) => {
        const errorMessage = handleValidateProduct(product);

        if (!!errorMessage) {
          error.push({
            productName: product.productName,
            message: errorMessage?.join(", "),
          });
        }

        return {
          productOrderDetailId: withoutPurchaseInvoice ? null : product?.id,
          productId: product?.productId,
          lotNumber: product?.lotNumber,
          dateManufacture: product?.dateManufacture,
          dateExpiration: product?.dateExpiration,
          quantity: product?.quantity,
          price: product?.price,
          vat: product?.vat,
          positionId: product?.positionId,
        };
      }
    );

    if (error.length > 0) {
      error.map((err: any) => {
        toast.error(`Sản phẩm: ${err.productName} lỗi: ${err.message}`);
      });

      return;
    }

    const payload: TCreateImportWarehouse = {
      productOrderId: data?.productOrderId || null,
      branchId: data?.branchId,
      deliveryId: data?.deliveryId,
      supplierId: data?.supplierId,
      purchaseId: data?.purchaseId,
      stockerId: data?.stockerId,
      note: data?.note,
      warehouseCreate: productList,
    };

    await mutateCreate.mutateAsync(payload);
  };

  const handleUpdateProducts = async (data: any) => {
    const { productList, id } = data;

    const payload = {
      warehouseUpdate: productList,
      id,
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
            className="mr-3"
            onClick={handleSubmit(handleUpdateProducts)}
            disabled={importStatus !== undefined && importStatus > 0}
          >
            <UpdateIcon className="mr-2" />
            Cập nhật SP
          </BaseButton>

          <PrintButton className="bg-error" onClick={handlePrint}>
            In{" "}
          </PrintButton>
          <Box className="hidden">
            <PrintImportDetail
              printAreaRef={printAreaRef}
              defaultValue={transactionData}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};
