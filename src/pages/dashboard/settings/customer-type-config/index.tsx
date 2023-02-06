import { CustomerTypeConfigPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <CustomerTypeConfigPage />

Index.displayName = "Danh sách loại khách hàng";

Index.layoutName = "Dashboard";

Index.data = {
    title: "CẤU HÌNH / LOẠI TÀI KHOẢN KHÁCH HÀNG"
}

export default Index;