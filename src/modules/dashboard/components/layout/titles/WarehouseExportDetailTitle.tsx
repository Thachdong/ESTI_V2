import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { warehouse } from "src/api";

export const WarehouseExportDetailTitle: React.FC = () => {
  const router = useRouter();

  const { id } = router.query;

  const { data: warehouseExportDetail } = useQuery(
    ["warehouseExportDetail_" + id],
    () => warehouse.getExportSessionById(id as string).then((res) => res.data),
    {
      enabled: !!id,
    }
  );

  if (!!id) {
    const code = warehouseExportDetail?.productOrder?.code;

    return <>XUẤT KHO / CHI TIẾT XUẤT KHO / {code}</>
  } else {
    return <>XUẤT KHO / TẠO XUẤT KHO</>
  }
};
