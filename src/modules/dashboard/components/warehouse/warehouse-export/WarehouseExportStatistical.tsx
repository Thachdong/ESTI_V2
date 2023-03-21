import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { warehouse } from "src/api";
import { CardReport } from "~modules-core/components";

export const WarehouseExportStatistical = () => {
  const query = useRouter().query;

  const { data: statisticalData } = useQuery(["getExportStatisticalData"], () =>
    warehouse.getExportStatisticalData({...query}).then((res) => res.data)
  );

  return (
    <Box className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
      <CardReport
        title={"ĐANG ĐÓNG GÓI"}
        BgImage={"Orange"}
        value={statisticalData?.dangDongGoi}
      />

      <CardReport
        title={" ĐANG VẬN CHUYỂN"}
        BgImage={"Green"}
        value={statisticalData?.dangVanChuyen}
      />

      <CardReport
        title={"HOÀN THÀNH"}
        BgImage={"Black"}
        value={statisticalData?.hoanThanh}
      />

      <CardReport
        title={" SỐ LƯỢNG HỦY BỎ"}
        BgImage={"Red"}
        value={statisticalData?.huyBo}
      />
    </Box>
  );
};
