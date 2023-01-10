import { UnitConfigPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <UnitConfigPage />

Index.displayName = "Danh sách đơn vị";

Index.layoutName = "Dashboard";

Index.data = {
    title: "CẤU HÌNH / DANH SÁCH ĐƠN VỊ"
}

export default Index;