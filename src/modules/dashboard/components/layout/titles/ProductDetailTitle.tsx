import { useRouter } from "next/router";

export const ProductDetailTitle: React.FC = () => {
  const router = useRouter();

  const { id } = router.query;

  if (!!id) {
    return <>QUẢN LÝ SẢN PHẨM / CHI TIẾT SẢN PHẨM</>;
  } else {
    return <>QUẢN LÝ SẢN PHẨM / TẠO SẢN PHẨM</>;
  }
};
