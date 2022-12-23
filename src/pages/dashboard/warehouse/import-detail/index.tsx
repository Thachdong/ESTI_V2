import { ImportDetailPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <ImportDetailPage />;

Index.displayName = "Nhập kho";

Index.layoutName = "Dashboard";

Index.data = {
  title: "NHẬP KHO / TẠO PHIẾU NHẬP KHO",
};

export default Index;
