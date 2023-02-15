import { Box } from "@mui/material";
import { useQuery } from "react-query";
import { bill } from "src/api";
import { CardReport } from "~modules-core/components";

export const BillListStatistic: React.FC = () => {
  const { data } = useQuery(["BillStatisticData"], () =>
    bill.getStatistic().then((res) => res.data)
  );

  return (
    <Box className="mb-4 grid grid-cols-4 gap-4 ">
      <CardReport title={"TỔNG GIÁ TRỊ HOÁ ĐƠN"} BgImage={"Orange"} value={0} />
      <CardReport
        title={"TỔNG GIÁ TRỊ ĐÃ THANH TOÁN"}
        BgImage={"Green"}
        value={0}
      />
      <CardReport
        title={"TỔNG GIÁ TRỊ CÒN PHẢI THU"}
        BgImage={"Black"}
        value={0}
      />
      <CardReport title={"TỔNG GIÁ TRỊ QUÁ HẠN"} BgImage={"Red"} value={0} />
    </Box>
  );
};
