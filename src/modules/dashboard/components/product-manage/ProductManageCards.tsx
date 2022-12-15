import { Box, Card, CardContent, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { productManage } from "src/api";
import { _format } from "~modules-core/utility/fomat";

export const ProductManageCards = () => {
  const { data } = useQuery(["product-manage-analistics"], () =>
    productManage.statistics().then((res) => res.data)
  );

  const warehouses = data?.stockLikst?.map((list: any) => list?.tenKho);

  const closeToDate = data?.stockLikst?.map((list: any) => list?.giaTriCanDate);

  const inventory = data?.stockLikst?.map((list: any) => list?.giaTriKho);

  const importNo = data?.stockLikst?.map((list: any) => list?.slCanNhapKho);

  return (
    <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
      <Card className="bg-[#48BB78] rounded-sm text-white">
        <CardContent>
          <Typography gutterBottom className="font-bold">
            GIÁ TRỊ TỒN KHO
          </Typography>

          {data?.stockLikst?.map((list: any, index: number) => (
            <Box className="flex" key={index}>
              <Typography className="text-2xl font-bold" component="span">
                {list?.tenKho}:
              </Typography>
              <Typography
                className="flex-grow text-right text-2xl font-bold"
                component="span"
              >
                {_format.getVND(list?.giaTriKho)} VND
              </Typography>
            </Box>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-[#4299e1] rounded-sm text-white">
        <CardContent>
          <Typography gutterBottom className="font-bold">
            HÀNG CẬN DATE
          </Typography>
          {data?.stockLikst?.map((list: any, index: number) => (
            <Box className="flex" key={index}>
              <Typography className="text-2xl font-bold" component="span">
                {list?.tenKho}:
              </Typography>
              <Typography
                className="flex-grow text-right text-2xl font-bold"
                component="span"
              >
                {_format.getVND(list?.giaTriCanDate)} VND
              </Typography>
            </Box>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-[#ECC94B] rounded-sm text-white">
        <CardContent>
          <Typography gutterBottom className="font-bold">
            NHẬP BỔ SUNG
          </Typography>

          {data?.stockLikst?.map((list: any, index: number) => (
            <Box className="flex" key={index}>
              <Typography className="text-2xl font-bold" component="span">
                {list?.tenKho}:
              </Typography>
              <Typography
                className="flex-grow text-right text-2xl font-bold"
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
