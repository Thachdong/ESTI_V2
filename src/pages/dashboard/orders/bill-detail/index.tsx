import { BillDetailPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <BillDetailPage />;

Index.displayName = "Tạo hóa đơn";

Index.layoutName = "Dashboard";

Index.data = {
  title: "ĐƠN HÀNG/ TẠO HÓA ĐƠN"
};

export default Index;
