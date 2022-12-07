import { BuyFromSupplierPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <BuyFromSupplierPage />;

Index.displayName = "Đơn mua hàng NCC";

Index.layoutName = "Dashboard";

Index.data = {
  title: "ĐƠN MUA HÀNG / ĐƠN MUA HÀNG NCC",
};

export default Index;
