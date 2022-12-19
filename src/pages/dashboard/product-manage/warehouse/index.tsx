import { WarehousePage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <WarehousePage />

Index.displayName = "Tra cứu vị trí";

Index.layoutName = "Dashboard";

Index.data = {
    title: "Quản lý sản phẩm / tra cứu vị trí",
}

export default Index;