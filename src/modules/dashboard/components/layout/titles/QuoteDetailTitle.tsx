import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { preQuote } from "src/api";

export const QuoteDetailTitle: React.FC = () => {
  const router = useRouter();

  const { id } = router.query;

  // DATA FETCHING
  const { data: quoteDetail } = useQuery(
    ["QuoteDetail", id],
    () => preQuote.getById(id as string).then((res) => res.data),
    {
      enabled: !!id,
    }
  );

  if (!!id) {
    const code = quoteDetail?.preQuoteView?.preQuoteCode;

    return <>BÁO GIÁ / CHI TIẾT BÁO GIÁ / {code}</>;
  } else {
    return <>BÁO GIÁ / TẠO ĐƠN BÁO GIÁ</>;
  }
};
