import { BillListPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <BillListPage />;

Index.displayName = "Hoá đơn";

Index.layoutName = "Dashboard";

Index.data = {
  title: "ĐƠN HÀNG/ HOÁ ĐƠN",
};

export default Index;
