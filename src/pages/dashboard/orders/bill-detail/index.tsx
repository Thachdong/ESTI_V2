import { BillDetailPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <BillDetailPage />;

Index.displayName = "Chi tiết hóa đơn";

Index.layoutName = "Dashboard";

Index.data = {
  pageName: "bill-detail-page"
};

export default Index;
