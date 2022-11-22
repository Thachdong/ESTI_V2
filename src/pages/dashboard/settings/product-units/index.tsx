import { UnitsPage } from "~modules-dashboard/pages/settings";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <UnitsPage />

Index.displayName = "Danh sách đơn vị";

Index.layoutName = "Dashboard";

Index.data = {
    title: "CẤU HÌNH / DANH SÁCH ĐƠN VỊ"
}

export default Index;