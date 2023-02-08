import { Box } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import UpdateIcon from "@mui/icons-material/BorderColorRounded";
import { BaseButton, PrintButton } from "~modules-core/components";
import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";
import { toast } from "~modules-core/toast";
import { useMutation } from "react-query";
import { TCreateExportWarehouse, TCreateExportWarehouseProduct, warehouse } from "src/api";

type TProps = {
  orderData: any;
  exportStatus?: number;
}

export const ExportDetailButtonsBox: React.FC<TProps> = ({orderData, exportStatus}) => {
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

  const handleValidateProduct = (product: any) => {
    const { lotNumber, positionId } = product;

    let messages: string[] = [];

    switch (true) {
      case !lotNumber:
        messages.push("chưa nhập số LOT!");
      case !positionId:
        messages.push("chưa nhập vị trí!");
    }

    return messages.length > 0 ? messages : null;
  };

  const handleCreate = async (data: any) => {
    // 1. CATCH INVALID PRODUCTS
    let error: any[] = [];

    const productList: TCreateExportWarehouseProduct[] = data.productList?.map(
      (prod: any) => {
        const errorMessage = handleValidateProduct(prod);

        if (!!errorMessage) {
          error.push({
            productName: prod?.productName,
            message: errorMessage?.join(", "),
          });
        }

        return {
          productId: prod?.productId,
          lotNumber: prod?.lotNumber,
          dateManufacture: prod?.dateManufacture,
          dateExpiration: prod?.dateExpiration,
          quantity: prod?.quantity,
          price: prod?.price,
          vat: prod?.vat,
          positionId: prod?.positionId,
        };
      }
    );

    if (error.length > 0) {
      error.map((err: any) => {
        toast.error(`Sản phẩm: ${err.productName} lỗi: ${err.message}`);
      });

      return;
    }

    // 2. CALL API
    const { paymentDocument, isForDelete } = data;

    let payload: any;

    if (isForDelete) {
      payload = {
        exportWarehouseCreate: productList,
        branchId: data.branchId,
        deliveryId: data.deliveryId
      }
    } else {
      payload = {
        ...data,
        paymentDocument: paymentDocument.join(","),
        exportWarehouseCreate: productList,
        branchId: orderData.branchId,
        deliveryId: orderData.deliveryId
      };
    }
    
    await createMutation.mutateAsync(payload);
  };

  const handleUpdateProducts = async (data: any) => {
    const { productList, id } = data;

    const payload = {
      warehouseUpdate: productList,
      id,
    };

    await mutateUpdate.mutateAsync(payload);
  };

  return (
    <Box className="flex justify-end my-4">
      {!query.id ? (
        <BaseButton
          type="button"
          onClick={handleSubmit(handleCreate)}
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
            disabled={exportStatus !== undefined && exportStatus > 0}
          >
            <UpdateIcon className="mr-2" />
            Cập nhật SP
          </BaseButton>

          <PrintButton>In chi tiết nhập kho</PrintButton>
        </Box>
      )}
    </Box>
  );
};
