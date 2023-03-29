import { Box, Card, CardContent, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { productManage } from "src/api";
import { _format } from "~modules-core/utility/fomat";
import BentoIcon from "@mui/icons-material/Bento";

export const ProductManageCards = () => {
  const { data } = useQuery(["product-manage-analistics"], () =>
    productManage.statistics().then((res) => res.data)
  );

  return (
    <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
      <Card className="rounded shadow-none">
        <CardContent>
          <Box className="flex justify-between items-center mb-2">
            <Typography gutterBottom className="font-bold text-sm">
              GIÁ TRỊ TỒN KHO
            </Typography>
            <Box className="w-[40px] h-[40px] flex justify-center items-center rounded text-[#48BB78] bg-[#ecf9f2]">
              <BentoIcon className="text-xl" />
            </Box>
          </Box>

          <Box className="grid gap-2">
            {data?.stockLikst?.map((list: any, index: number) => (
              <Box className="flex" key={index}>
                <Typography
                  className="text-sm font-bold truncate uppercase"
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
          </Box>
        </CardContent>
      </Card>

      <Card className="rounded shadow-none">
        <CardContent>
          <Box className="flex justify-between items-center mb-2">
            <Typography gutterBottom className="font-bold text-sm">
              HÀNG CẬN DATE
            </Typography>
            <Box className="w-[40px] h-[40px] flex justify-center items-center rounded text-[#4299e1] bg-[#e1eef8]">
              <BentoIcon className="text-xl" />
            </Box>
          </Box>

          <Box className="grid gap-2">
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
          </Box>
        </CardContent>
      </Card>

      <Card className="rounded shadow-none">
        <CardContent>
          <Box className="flex justify-between items-center mb-2">
            <Typography gutterBottom className="font-bold text-sm">
              NHẬP BỔ SUNG
            </Typography>
            <Box className="w-[40px] h-[40px] flex justify-center items-center rounded text-[#ECC94B] bg-[#f0ecde]">
              <BentoIcon className="text-xl" />
            </Box>
          </Box>

          <Box className="grid gap-2">
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
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
