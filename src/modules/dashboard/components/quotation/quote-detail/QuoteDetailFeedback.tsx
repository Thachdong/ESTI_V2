import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { preQuote } from "src/api";
import { DataTable } from "~modules-core/components";
import { feedbackColumns } from "~modules-dashboard/pages/quotation/quote-detail/data";

export const QuoteDetailFeedback: React.FC = () => {
  const { id } = useRouter().query;

  const { data: feedbacks } = useQuery(["Feedbacks", id], () =>
    preQuote.getFeedbacks(id as string).then((res) => res.data)
  );

  return (
    <Box className="flex flex-col lg:col-span-2">
      <Typography className="font-bold uppercase mb-3 text-sm">
        PHẢN HỒI KHÁCH HÀNG
      </Typography>

      <Box className="bg-white">
        <DataTable
          rows={feedbacks || []}
          columns={feedbackColumns}
          hideFooter
          hideSearchbar
          autoHeight
        />
      </Box>
    </Box>
  );
};
