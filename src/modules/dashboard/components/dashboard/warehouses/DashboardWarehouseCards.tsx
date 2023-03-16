import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { dashboard } from "src/api";
import { CardReport } from "~modules-core/components";
import { defaultBranchId } from "~modules-core/constance";
import { _format } from "~modules-core/utility/fomat";

export const DashboardWarehouseCards: React.FC = () => {
  const { branchId = defaultBranchId } = useRouter().query;

  const { data } = useQuery(
    ["WarehouseStatisticData", branchId],
    () => dashboard.getWarehouse(branchId as string).then((res) => res.data),
    {
      enabled: !!branchId,
    }
  );

  return (
    <Box className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
      <CardReport
        title="Số lượng / Giá trị tồn kho"
        BgImage={"Orange"}
        value={`${data?.sLTon || 0} / ${_format.getVND(data?.giaTriTon)}`}
      />
      <CardReport
        title="Số lượng / Giá trị mua hàng"
        BgImage={"Green"}
        value={`${data?.sLMuaHang || 0} / ${_format.getVND(data?.giaTriMuaHang)}`}
      />
      <CardReport
        title="Số lượng / Giá trị quá hạn"
        BgImage={"Black"}
        value={`${data?.sLQuaHan || 0} / ${_format.getVND(data?.giaTriQuaHan)}`}
      />
      <CardReport
        title="Số lượng nhập bổ sung"
        BgImage={"Red"}
        value={_format.getVND(data?.sLNhapBoSung)}
      />
    </Box>
  );
};
