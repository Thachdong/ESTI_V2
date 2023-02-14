import { OrderDetailPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <OrderDetailPage />;

Index.displayName = "Tạo đơn đặt hàng";

Index.layoutName = "Dashboard";

Index.data = {
  title: "ĐƠN HÀNG/ TẠO ĐƠN ĐẶT HÀNG"
};

export default Index;
