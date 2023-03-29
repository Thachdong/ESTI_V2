import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { quoteRequest } from "src/api";
import { StatusChip } from "~modules-core/components";

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
    const { preOrderCode, preOrderStatus, preOrderStatusName } =
      requestDetail?.preOrderView || {};

    return (
      <Box>
        BÁO GIÁ / CHI TIẾT YÊU CẦU BÁO GIÁ / {preOrderCode}
        {preOrderStatusName && (
          <StatusChip
            className="lg:mb-4"
            status={preOrderStatus}
            label={preOrderStatusName}
            color={preOrderStatus === 4 ? "error" : undefined}
          />
        )}
      </Box>
    );
  } else {
    return <>BÁO GIÁ / TẠO YÊU CẦU BÁO GIÁ</>;
  }
};
