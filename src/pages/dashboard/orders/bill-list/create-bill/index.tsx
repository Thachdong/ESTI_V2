import { CreateBillPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <CreateBillPage />;

Index.displayName = "Tạo hoá đơn";

Index.layoutName = "Dashboard";

Index.data = {
  title: "ĐƠN HÀNG/ TẠO HOÁ ĐƠN",
};

export default Index;
