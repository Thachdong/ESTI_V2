import { CustomerCareGroupPage } from "~modules-dashboard/pages/settings/customer-care-group";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <CustomerCareGroupPage />

Index.displayName = "Danh sách nhóm CSKH";

Index.layoutName = "Dashboard";

Index.data = {
    title: "CẤU HÌNH / NHÓM CSKH"
}

export default Index;