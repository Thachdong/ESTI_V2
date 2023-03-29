import { Box, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { quoteRequest } from "src/api";
import style from "~modules-dashboard/styles/quotation/quote-request.module.css";

export const QuoteRequestHeader: React.FC = () => {
  const { data } = useQuery(["QuotationHeaderData"], () =>
    quoteRequest.getHeaderOrder().then((res) => res.data)
  );

  return (
    <Box className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      <Box
        className={style["card"]}
        sx={{ backgroundImage: "url(/images/quotation/quote-request-4.png)" }}
      >
        <Typography className="font-bold">đang tạm ngưng</Typography>
        <Typography className="font-bold text-2xl">
          {data?.dangTamNgung}
        </Typography>
      </Box>

      <Box
        className={style["card"]}
        sx={{ backgroundImage: "url(/images/quotation/quote-request-3.png)" }}
      >
        <Typography className="font-bold">đã kết chuyển</Typography>
        <Typography className="font-bold text-2xl">
          {data?.ketChuyenBaoGia}
        </Typography>
      </Box>

      <Box
        className={style["card"]}
        sx={{ backgroundImage: "url(/images/quotation/quote-request-2.png)" }}
      >
        <Typography className="font-bold">chưa thực hiện</Typography>
        <Typography className="font-bold text-2xl">
          {data?.chuaThucHien}
        </Typography>
      </Box>

      <Box
        className={style["card"]}
        sx={{ backgroundImage: "url(/images/quotation/quote-request-1.png)" }}
      >
        <Typography className="font-bold">hủy bỏ</Typography>
        <Typography className="font-bold text-2xl">{data?.huyBo}</Typography>
      </Box>
    </Box>
  );
};
