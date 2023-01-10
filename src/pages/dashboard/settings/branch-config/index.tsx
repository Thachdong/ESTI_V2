import { BranchConfigPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <BranchConfigPage />

Index.displayName = "Danh sách chi nhánh";

Index.layoutName = "Dashboard";

Index.data = {
    title: "CẤU HÌNH / DANH SÁCH CHI NHÁNH"
}

export default Index;