import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { purchaseOrderBill } from "src/api/purchase-order-bill";
import { StatusChip } from "~modules-core/components";

export const PurchaseBillDetailTitle: React.FC = () => {
  const router = useRouter();

  const { id } = router.query;

  // DATA FETCHING
  const { data: billDetail } = useQuery(
    ["PurchaseOrderBillDetail", id],
    () => purchaseOrderBill.getById(id as string).then((res) => res.data),
    {
      enabled: !!id,
    }
  );

  if (!!id) {
    const { billNumber, status, statusName } = billDetail?.productOrderBillById || {};

    return (
      <>
        ĐƠN HÀNG / CHI TIẾT HÓA ĐƠN / {billNumber}{" "}
        {statusName && (
          <StatusChip
            className="lg:mb-4"
            status={status}
            label={statusName}
            color={status === 4 ? "error" : undefined}
          />
        )}
      </>
    );
  } else {
    return <>ĐƠN MUA HÀNG / TẠO HÓA ĐƠN</>;
  }
};
