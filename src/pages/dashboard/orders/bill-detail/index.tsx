import { BillDetailPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <BillDetailPage />;

Index.displayName = "Chi tiết hóa đơn";

Index.layoutName = "Dashboard";

Index.data = {
  title: "ĐƠN HÀNG/ CHI TIẾT HÓA ĐƠN",
  
};

export default Index;
