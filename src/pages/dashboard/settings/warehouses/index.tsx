import { WarehouseConfigPage } from "~modules-dashboard/pages/settings";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <WarehouseConfigPage />

Index.displayName = "Danh sách kho";

Index.layoutName = "Dashboard";

Index.data = {
    title: "CẤU HÌNH / DANH SÁCH KHO"
}

export default Index;