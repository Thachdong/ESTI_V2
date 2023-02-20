import { PurchaseBillDetailPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <PurchaseBillDetailPage />;

Index.displayName = "Chi tiết hóa đơn";

Index.layoutName = "Dashboard";

Index.data = {
  title: "ĐƠN MUA HÀNG / CHI TIẾT HÓA ĐƠN",
};

export default Index;
