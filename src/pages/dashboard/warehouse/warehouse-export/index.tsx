import { WarehouseExportPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <WarehouseExportPage />;

Index.displayName = "Xuất kho";

Index.layoutName = "Dashboard";

Index.data = {
  title: "XUẤT KHO",
};

export default Index;
