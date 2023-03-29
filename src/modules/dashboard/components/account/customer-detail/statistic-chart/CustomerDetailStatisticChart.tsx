import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { customer } from "src/api";
import { AutoCompleteBase } from "~modules-core/components";
import { BarChart } from "./BarChart";

export const CustomerDetailStatisticChart: React.FC = () => {
  const [selectedCuratorId, setSelectedCuratorId] = useState<string>();
  
  const { id } = useRouter().query;

  // DATA FETCHING
  const { data: customerDetail } = useQuery(
    ["CustomerDetail", id],
    () => customer.getById(id as string).then((res) => res.data),
    {
      enabled: !!id,
    }
  );

  const { data } = useQuery(
    ["CustomerStatistic", selectedCuratorId],
    () => customer.getStatisticById(selectedCuratorId as string).then((res) => res.data),
    {
      enabled: !!selectedCuratorId,
    }
  );

  // SIDE EFFECTS
  useEffect(() => {
    const { curatorInfo = [] } = customerDetail || {};

    if (!!curatorInfo[0]) {
      setSelectedCuratorId(curatorInfo[0]?.id);
    }
  }, [customerDetail]);

  return (
    <Box className="flex flex-col my-4">
      <Box className="flex items-center justify-between mb-3">
        <Typography className="font-bold uppercase text-sm">
        Biểu đồ giá trị đơn hàng
        </Typography>

        <AutoCompleteBase
          options={customerDetail?.curatorInfo || []}
          value={selectedCuratorId}
          label="Chọn tài khoản"
          onChange={(id: any) => setSelectedCuratorId(id)}
          getOptionLabel={(opt: any) =>
            !!opt ? `${opt.accountCode} - ${opt.curatorName}` : ""
          }
          className="min-w-[250px]"
          shrinkLabel
        />
      </Box>

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
