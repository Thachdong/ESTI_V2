import { PurchaseBillDetailPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <PurchaseBillDetailPage />;

Index.displayName = "Chi tiết hóa đơn";

Index.layoutName = "Dashboard";

Index.data = {
  pageName: "purchase-bill-detail-page"
};

export default Index;