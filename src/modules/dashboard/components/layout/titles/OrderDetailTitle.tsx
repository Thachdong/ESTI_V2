import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { mainOrder } from "src/api";
import { StatusChip } from "~modules-core/components";

export const OrderDetailTitle: React.FC = () => {
  const router = useRouter();

  const { id } = router.query;

  // DATA FETCHING
  const { data: orderDetail } = useQuery(
    ["orderDetail", id],
    () => mainOrder.getById(id as string).then((res) => res.data),
    {
      enabled: !!id,
    }
  );

  if (!!id) {
    const { mainOrderCode, status, statusName } = orderDetail?.mainOrder || {};
    
    const colors = ["default", "info", "success", "error"];
    
    return (
      <>
        ĐƠN HÀNG / CHI TIẾT ĐƠN ĐẶT HÀNG / {mainOrderCode}{" "}
        {statusName && (
          <StatusChip
            label={statusName}
            status={status}
            color={colors[status - 1] as any}
            className="mb-4"
          />
        )}
      </>
    );
  } else {
    return <>ĐƠN HÀNG/ TẠO ĐƠN ĐẶT HÀNG</>;
  }
};
