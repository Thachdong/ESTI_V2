import { PurchaseBill } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <PurchaseBill />
Index.displayName = "Hóa đơn mua hàng";

Index.layoutName = "Dashboard";

Index.data = {
  title: "ĐƠN MUA HÀNG / HÓA ĐƠN",
};

export default Index;
