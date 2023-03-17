import { StoragePage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <StoragePage />

Index.displayName = "Vị trí hàng hoá";

Index.layoutName = "Dashboard";

Index.data = {
    title: "Quản lý sản phẩm / Vị trí hàng hoá",
}

export default Index;