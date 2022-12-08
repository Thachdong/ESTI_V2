import { OrderRequestPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <OrderRequestPage />;

Index.displayName = "Đơn đặt hàng";

Index.layoutName = "Dashboard";

Index.data = {
  title: "ĐƠN HÀNG/ ĐƠN ĐẶT HÀNG",
};

export default Index;
