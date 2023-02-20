import { Box } from "@mui/material";
import { useQuery } from "react-query";
import { bill } from "src/api";
import { CardReport } from "~modules-core/components";
import { _format } from "~modules-core/utility/fomat";

export const BillListStatistic: React.FC = () => {
  const { data } = useQuery(["BillStatisticData"], () =>
    bill.getStatistic().then((res) => res.data)
  );

  return (
    <Box className="mb-4 grid grid-cols-2 xl:grid-cols-4 gap-4 ">
      <CardReport
        title={"TỔNG GIÁ TRỊ HOÁ ĐƠN"}
        BgImage={"Orange"}
        value={_format.getVND(data?.tongGiaTri)}
      />
      <CardReport
        title={"TỔNG GIÁ TRỊ ĐÃ THANH TOÁN"}
        BgImage={"Green"}
        value={_format.getVND(data?.daThanhToan)}
      />
      <CardReport
        title={"TỔNG GIÁ TRỊ CÒN PHẢI THU"}
        BgImage={"Black"}
        value={_format.getVND(data?.conLai)}
      />
      <CardReport
        title={"TỔNG GIÁ TRỊ QUÁ HẠN"}
        BgImage={"Red"}
        value={_format.getVND(data?.quaHan)}
      />
    </Box>
  );
};
