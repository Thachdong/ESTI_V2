import { CreateSupplierPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <CreateSupplierPage />;

Index.displayName = "Tạo đơn mua hàng";

Index.layoutName = "Dashboard";

Index.data = {
  title: "ĐƠN MUA HÀNG / TẠO ĐƠN MUA HÀNG",
};

export default Index;
