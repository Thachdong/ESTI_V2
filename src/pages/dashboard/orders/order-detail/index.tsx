import { OrderDetailPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <OrderDetailPage />;

Index.displayName = "Chi tiết đơn đặt hàng";

Index.layoutName = "Dashboard";

Index.data = {
  pageName: "order-detail-page",
};

export default Index;
