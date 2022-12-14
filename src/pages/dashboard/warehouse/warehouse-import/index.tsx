import { WarehouseImportPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <WarehouseImportPage />;

Index.displayName = "Nhập kho";

Index.layoutName = "Dashboard";

Index.data = {
  title: "NHẬP KHO",
};

export default Index;
