import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { customer } from "src/api";
import { BarChart } from "./BarChart";

export const CustomerDetailStatisticChart: React.FC = () => {
  const { id } = useRouter().query;

  const { data } = useQuery(
    ["CustomerStatistic", id],
    () => customer.getStatisticById(id as string).then((res) => res.data),
    {
      enabled: !!id,
    }
  );

  return (
    <Box className="flex flex-col my-4">
      <Typography className="font-bold uppercase text-sm mr-3 mb-3">
        Biểu đồ giá trị đơn hàng
      </Typography>
      <Box className="bg-white p-3">
        <Typography className="text-right font-semibold">
          Năm: {data?.inYear?.year}
        </Typography>

        <BarChart data={(data?.inYear?.GetValueMainOrder as []) || []} />

        <Typography className="text-right font-semibold">
          Năm: {data?.lastYear?.year}
        </Typography>

        <BarChart data={(data?.lastYear?.GetValueMainOrder as []) || []} />
      </Box>
    </Box>
  );
};
