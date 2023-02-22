import { PurchaseRequestDetailPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index:TNextPageWithLayout = () => <PurchaseRequestDetailPage />

Index.displayName = "Tạo đơn mua hàng";

Index.layoutName = "Dashboard";

Index.data = {
  pageName: "purchase-request-detail-page"
};

export default Index;