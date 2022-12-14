import { SuppliersPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <SuppliersPage />

Index.displayName = "Danh sách nhà cung cấp";

Index.layoutName = "Dashboard"

Index.data = {
  title: "TÀI KHOẢN / DANH SÁCH NHÀ CUNG CẤP"
}

export default Index;
