import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { mainOrder } from "src/api";

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
    const code = orderDetail?.mainOrder?.mainOrderCode;

    return <>ĐƠN HÀNG / CHI TIẾT ĐƠN ĐẶT HÀNG / {code}</>;
  } else {
    return <>ĐƠN HÀNG/ TẠO ĐƠN ĐẶT HÀNG</>;
  }
};
