import { useRouter } from "next/router";

export const PositionDetailTitle: React.FC = () => {
  const router = useRouter();

  const { id } = router.query;

  if (!!id) {
    return <>QUẢN LÝ SẢN PHẨM / CHI TIẾT VỊ TRÍ</>;
  } else {
    return <>QUẢN LÝ SẢN PHẨM / TẠO VỊ TRÍ</>;
  }
};
