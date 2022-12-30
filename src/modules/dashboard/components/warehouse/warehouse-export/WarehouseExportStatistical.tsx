import { Box, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { warehouse } from "src/api";

export const WarehouseExportStatistical = () => {
  const { data: statisticalData } = useQuery(["getExportStatisticalData"], () =>
    warehouse.getExportStatisticalData().then((res) => res.data)
  );

  return (
    <Box className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      <Box className="flex flex-col justify-between text-white rounded-sm bg-[#A0AEC0] p-3">
        <Typography className="font-bold truncate mb-4">ĐANG ĐÓNG GÓI</Typography>
        <Typography variant="h5" className="font-bold text-right">
          {statisticalData?.dangDongGoi}
        </Typography>
      </Box>

      <Box className="flex flex-col justify-between text-white rounded-sm bg-[#4299e1] p-3">
        <Typography className="font-bold truncate mb-4">ĐANG VẬN CHUYỂN</Typography>
        <Typography variant="h5" className="font-bold text-right">
          {statisticalData?.dangVanChuyen}
        </Typography>
      </Box>

      <Box className="flex flex-col justify-between text-white rounded-sm bg-[#48BB78] p-3">
        <Typography className="font-bold truncate mb-4">HOÀN THÀNH</Typography>
        <Typography variant="h5" className="font-bold text-right">
          {statisticalData?.hoanThanh}
        </Typography>
      </Box>

      <Box className="flex flex-col justify-between text-white rounded-sm bg-[#F56565] p-3">
        <Typography className="font-bold truncate mb-4">SỐ LƯỢNG HỦY BỎ</Typography>
        <Typography variant="h5" className="font-bold text-right">
          {statisticalData?.huyBo}
        </Typography>
      </Box>
    </Box>
  );
};
