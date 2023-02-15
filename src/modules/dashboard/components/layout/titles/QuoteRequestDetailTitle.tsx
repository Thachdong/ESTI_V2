import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { quoteRequest } from "src/api";

export const QuoteRequestDetailTitle: React.FC = () => {
  const router = useRouter();

  const { id } = router.query;

  // DATA FETCHING
  const { data: requestDetail } = useQuery(
    ["RequestDetail_" + id],
    () => quoteRequest.getById(id as string).then((res) => res.data),
    {
      enabled: !!id,
    }
  );

  if (!!id) {
    const code = requestDetail?.preOrderView?.preOrderCode;

    return <>BÁO GIÁ / CHI TIẾT YÊU CẦU BÁO GIÁ / {code}</>;
  } else {
    return <>BÁO GIÁ / TẠO YÊU CẦU BÁO GIÁ</>;
  }
};
