import { Box, List, ListItem, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { products, warehouse } from "src/api";

export const DocumentsDetails: React.FC = () => {
  const router = useRouter();

  const { productId, importId } = router.query;

  const { data: productDetail } = useQuery(
    ["ProductDetail", productId],
    () => products.getById(productId as string).then((res) => res.data),
    {
      enabled: !!productId,
    }
  );

  const images = !!productDetail?.image
    ? productDetail?.image?.split?.(",")
    : [];

  const { data: importDetail } = useQuery(
    ["ImportDetail", importId],
    () =>
      warehouse
        .getImportSessionById(importId as string)
        .then((res) => res.data),
    {
      enabled: !!importId,
    }
  );
  return (
    <Box className="mb-4">
      <Typography className="font-semibold mb-2">THÔNG TIN SẢN PHẨM</Typography>

      <Box className="grid grid-cols-10 gap-4">
        <Box className="col-span-3">
          <Carousel height={350}>
            {images.length === 0 ? (
              <img src={"/no-image.jpg"} className="w-full" />
            ) : (
              images.map?.((item: string) => <Box>{item}</Box>)
            )}
          </Carousel>
        </Box>
        <List className="col-span-7 py-0">
          <ListItem className="py-0 mb-1">- Tên sản phẩm: {productDetail?.productName}</ListItem>
          <ListItem className="py-0 mb-1">- Công thức hoá học: {productDetail?.chemicalName}</ListItem>
          <ListItem className="py-0 mb-1">- Quy cách: {productDetail?.specs}</ListItem>
          <ListItem className="py-0 mb-1">- LOT #: {productDetail?.productName}</ListItem>
          <ListItem className="py-0 mb-1">- Hãng sản xuất: {productDetail?.manufactor}</ListItem>
          <ListItem className="py-0 mb-1">- Xuất xứ: {productDetail?.origin}</ListItem>
          <ListItem className="py-0 mb-1">- Nhà nhập khẩu: {importDetail?.warehouseSession?.supplierName}</ListItem>
          <ListItem className="py-0 mb-1">- Địa chỉ: {importDetail?.warehouseSession?.supplierAddress}</ListItem>
          <ListItem className="py-0 mb-1">
            - Sản phẩm chỉ sử dụng trong phòng thí nghiệm, điều kiện bảo quản và
            lưu trữ theo hướng dẫn phiếu an toàn hoá chất. Không được lưu trữ và
            sử dụng tại nhà. Khi gặp sự cố, tiến hành sơ cứu tại chỗ và liên hệ
            đến cơ quan y tế gần nhất.
          </ListItem>
          <ListItem className="py-0 mb-1">
            - Các thông tin khác xem trên bao bì hoặc truy cập website:{" "}
            <a href="navis.com.vn">navis.com.vn</a>
          </ListItem>
          <ListItem className="py-0 mb-1">
            - Điện thoại liên hệ: <a href="tel:02862631422">028 62631422</a>
          </ListItem>
          <ListItem>
            - e-Mail: <a href="planning@navis.com.vn">planning@navis.com.vn</a>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};
