import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <div>Warehouses list</div>

Index.displayName = "Danh sách kho";

Index.layoutName = "Dashboard";

Index.data = {
    title: "CẤU HÌNH / DANH SÁCH KHO"
}

export default Index;