import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { purchaseOrder } from "src/api";
import { StatusChip } from "~modules-core/components";

export const PurchaseRequestTitle: React.FC = () => {
  const router = useRouter();

  const { id } = router.query;

  // DATA FETCHING
  const { data: purchaseRequestDetail, refetch } = useQuery(
    ["QuoteDetail", id],
    () => purchaseOrder.getById(id as string).then((res) => res.data),
    {
      enabled: !!id,
    }
  );

  if (!!id) {
    const { code, status, statusName } =
    purchaseRequestDetail?.productOrder?.productOrder || {};

    return (
      <>
        ĐƠN MUA HÀNG / CHI TIẾT ĐƠN MUA HÀNG / {code}{" "}
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
    return <>ĐƠN MUA HÀNG / TẠO ĐƠN MUA HÀNG</>;
  }
};
