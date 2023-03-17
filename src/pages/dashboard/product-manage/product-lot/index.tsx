import { ProductLotPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <ProductLotPage />

Index.displayName = "Quản lý lô";

Index.layoutName = "Dashboard";

Index.data = {
    title: "Quản lý sản phẩm / lô sản phẩm"
}

export default Index;