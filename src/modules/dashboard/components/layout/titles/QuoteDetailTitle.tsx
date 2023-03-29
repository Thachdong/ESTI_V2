import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { preQuote } from "src/api";
import { StatusChip } from "~modules-core/components";

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
    const { preQuoteCode, status, statusName } =
      quoteDetail?.preQuoteView || {};

    return (
      <>
        BÁO GIÁ / CHI TIẾT BÁO GIÁ / {preQuoteCode}{" "}
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
    return <>BÁO GIÁ / TẠO ĐƠN BÁO GIÁ</>;
  }
};
