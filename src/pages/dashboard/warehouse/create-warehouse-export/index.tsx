import { CreateWarehouseExportPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <CreateWarehouseExportPage />;

Index.displayName = "Xuất kho";

Index.layoutName = "Dashboard";

Index.data = {
  title: "XUẤT KHO / TẠO PHIẾU XUẤT KHO",
};

export default Index;
