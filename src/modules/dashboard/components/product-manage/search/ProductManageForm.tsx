import { Box, ImageList, ImageListItem, ListSubheader } from "@mui/material";
import { useQuery } from "react-query";
import { products } from "src/api/products";
import { FormInputBase } from "~modules-core/components";

type TProps = {
  productId: string;
};

export const ProductManageForm: React.FC<TProps> = ({ productId }) => {
  const { data: productDetail } = useQuery(
    ["productDetail", productId],
    () => products.getById(productId).then((res) => res.data),
    {
      enabled: !!productId,
    }
  );

  const { suppliers } = productDetail?.product || {};

  let supplierList: string;

  try {
    supplierList = JSON.parse(suppliers || "[]")
      .map((sup: any) => sup?.supplierName)
      .join(", ");
  } catch (err: any) {
    supplierList = "";
  }

  const productGallery = productDetail?.product?.gallery?.split(",") || [];

  return (
    <Box className="grid grid-cols-2 col-span-2 gap-4 my-4">
      <FormInputBase
        label="Tên SP:"
        disabled={true}
        value={productDetail?.product?.productName}
      />

      <FormInputBase
        label="Mã SP:"
        disabled={true}
        value={productDetail?.product?.productCode}
      />

      <FormInputBase
        label="Nhóm SP:"
        disabled={true}
        value={productDetail?.product?.productGroupName}
      />

      <FormInputBase
        label="Mã CAS:"
        disabled={true}
        value={productDetail?.product?.casCode}
      />

      <FormInputBase
        label="Công thức hóa học:"
        disabled={true}
        value={productDetail?.product?.chemicalName}
      />

      <FormInputBase
        label="Hãng sản xuất:"
        disabled={true}
        value={productDetail?.product?.manufactor}
      />

      <FormInputBase
        label="Xuất xứ:"
        disabled={true}
        value={productDetail?.product?.origin}
      />

      <FormInputBase
        label="Quy cách:"
        disabled={true}
        value={productDetail?.product?.specs}
      />

      <FormInputBase
        label="Đơn vị tính:"
        disabled={true}
        value={productDetail?.product?.unitName}
      />

      <FormInputBase
        label="Nhà cung cấp:"
        disabled={true}
        value={supplierList}
      />

      <FormInputBase
        label="Danh mục HC:"
        disabled={true}
        value={productDetail?.product?.chemicalAppendix}
      />

      <FormInputBase
        label="Thuế VAT:"
        disabled={true}
        value={productDetail?.product?.vat}
      />

      <ImageList className="col-span-2 mt-0">
        <ImageListItem>
          <ListSubheader className="text-[#000] pl-0">
            Hình ảnh sản phẩm
          </ListSubheader>

          {productGallery.length === 0 && (
            <ListSubheader className="font-normal">Không có hình ảnh được hiển thị</ListSubheader>
          )}
        </ImageListItem>

        {productGallery.map((img: string, index: number) => (
          <ImageListItem key={index}>
            <img src={img} alt={productDetail?.product?.productName} />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};
