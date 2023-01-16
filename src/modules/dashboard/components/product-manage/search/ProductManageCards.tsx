import { Box, Card, CardContent, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { productManage } from "src/api";
import { _format } from "~modules-core/utility/fomat";

export const ProductManageCards = () => {
  const { data } = useQuery(["product-manage-analistics"], () =>
    productManage.statistics().then((res) => res.data)
  );

  return (
    <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
      <Card className="bg-[#48BB78] rounded text-white">
        <CardContent>
          <Typography gutterBottom className="font-bold">
            GIÁ TRỊ TỒN KHO
          </Typography>

          {data?.stockLikst?.map((list: any, index: number) => (
            <Box className="flex" key={index}>
              <Typography
                className="text-sm font-bold truncate"
                component="span"
              >
                {list?.tenKho}
              </Typography>
              <Typography
                className="flex-grow text-right text-sm font-bold"
                component="span"
              >
                {_format.getVND(list?.giaTriKho)} Đ
              </Typography>
            </Box>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-[#4299e1] rounded text-white">
        <CardContent>
          <Typography gutterBottom className="font-bold">
            HÀNG CẬN DATE
          </Typography>
          {data?.stockLikst?.map((list: any, index: number) => (
            <Box className="flex" key={index}>
              <Typography
                className="text-sm font-bold truncate"
                component="span"
              >
                {list?.tenKho}:
              </Typography>
              <Typography
                className="flex-grow text-right text-sm font-bold"
                component="span"
              >
                {_format.getVND(list?.giaTriCanDate)} Đ
              </Typography>
            </Box>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-[#ECC94B] rounded text-white">
        <CardContent>
          <Typography gutterBottom className="font-bold">
            NHẬP BỔ SUNG
          </Typography>

          {data?.stockLikst?.map((list: any, index: number) => (
            <Box className="flex" key={index}>
              <Typography
                className="text-sm font-bold truncate"
                component="span"
              >
                {list?.tenKho}:
              </Typography>
              <Typography
                className="flex-grow text-right text-sm font-bold"
                component="span"
              >
                {_format.getVND(list?.slCanNhapKho)} Mặt hàng
              </Typography>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
};
