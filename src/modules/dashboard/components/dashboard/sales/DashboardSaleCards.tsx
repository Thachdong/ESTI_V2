import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { dashboard } from "src/api";
import { CardReport } from "~modules-core/components";
import { defaultBranchId } from "~modules-core/constance";
import { _format } from "~modules-core/utility/fomat";

export const DashboardSaleCards: React.FC = () => {
  const { branchId = defaultBranchId } = useRouter().query;

  const { data } = useQuery(
    ["SaleStatisticData", branchId],
    () => dashboard.getSale(branchId as string).then((res) => res.data),
    {
      enabled: !!branchId,
    }
  );

  return (
    <Box className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
      <CardReport
        title="Tổng đơn hàng"
        BgImage={"Orange"}
        value={data?.tongDonHang}
      />
      <CardReport
        title="Tổng giá trị đơn hàng"
        BgImage={"Green"}
        value={_format.getVND(data?.tongGiaTriDonHang)}
      />
      <CardReport
        title="Tổng số lượng khách hàng"
        BgImage={"Black"}
        value={data?.tongSoLuongKhachHang}
      />
      <CardReport
        title="Công nợ quá hạn"
        BgImage={"Red"}
        value={_format.getVND(data?.congNoQuaHan)}
      />
    </Box>
  );
};
