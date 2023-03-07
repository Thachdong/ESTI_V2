import { Box } from "@mui/material";
import { useQuery } from "react-query";
import { customerCare } from "src/api";
import { CardReport } from "~modules-core/components";
import { _format } from "~modules-core/utility/fomat";

type TProps = {
  fromdate: number;
  todate: number;
};

export const StatisticCards: React.FC<TProps> = ({ fromdate, todate }) => {
  const { data } = useQuery(
    ["CustomerCareStatisticData", todate, fromdate],
    () =>
      customerCare
        .getStatistic({
          fromdate,
          todate,
          pageIndex: 1, // Theo yêu cầu của api
          pageSize: 9999, // Theo yêu cầu của api
        })
        .then((res) => res.data)
  );

  return (
    <Box className="mb-4 grid grid-cols-2 xl:grid-cols-5 gap-4 ">
      <CardReport
        title={"TỔNG HẸN GẶP"}
        BgImage={"Orange"}
        value={_format.getVND(data?.[0]?.appointment)}
      />
      <CardReport
        title={"TỔNG GỌI ĐIỆN"}
        BgImage={"Green"}
        value={_format.getVND(data?.[0]?.callPhone)}
      />
      <CardReport
        title={"TỔNG TẶNG QUÀ"}
        BgImage={"Black"}
        value={_format.getVND(data?.[0]?.gift)}
      />
      <CardReport
        title={"TỔNG NHẮN TIN"}
        BgImage={"Red"}
        value={_format.getVND(data?.[0]?.messager)}
      />
      <CardReport
        title={"TỔNG GỬI MAIL"}
        BgImage={"Orange"}
        value={_format.getVND(data?.[0]?.sendMail)}
      />
    </Box>
  );
};
