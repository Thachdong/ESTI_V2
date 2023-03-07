import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { warehouse } from "src/api";

export const WarehouseImportDetailTitle: React.FC = () => {
  const router = useRouter();

  const { id } = router.query;

  const { data: warehouseImportDetail } = useQuery(
    ["ImportWarehouseDetail_" + id],
    () =>
      warehouse
        .getImportSessionById(id as string)
        .then((res) => res.data),
    {
      enabled: !!id,
    }
  );

  if (!!id) {
    const code = warehouseImportDetail?.warehouseSession?.code;

    return <>NHẬP KHO / CHI TIẾT NHẬP KHO / {code}</>
  } else {
    return <>NHẬP KHO / TẠO NHẬP KHO</>
  }
};
