import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { bill } from "src/api";
import { StatusChip } from "~modules-core/components";

export const BillDetailTitle: React.FC = () => {
  const router = useRouter();

  const { id } = router.query;

  // DATA FETCHING
  const { data: billDetail } = useQuery(
    ["billDetail", id],
    () => bill.getById(id as string).then((res) => res.data),
    {
      enabled: !!id,
    }
  );

  if (!!id) {
    const {billCode, status, statusName} = billDetail?.BillView?.bill || {};

    return <>ĐƠN HÀNG / CHI TIẾT HÓA ĐƠN / {billCode} {statusName && (
      <StatusChip
        className="lg:mb-4"
        status={status}
        label={statusName}
        color={status === 4 ? "error" : undefined}
      />
    )}</>;
  } else {
    return <>ĐƠN HÀNG/ TẠO HÓA ĐƠN</>;
  }
};
