import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { bill } from "src/api";

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
    const code = billDetail?.BillView?.bill?.billCode;

    return <>ĐƠN HÀNG / CHI TIẾT HÓA ĐƠN / {code}</>;
  } else {
    return <>ĐƠN HÀNG/ TẠO HÓA ĐƠN</>;
  }
};
