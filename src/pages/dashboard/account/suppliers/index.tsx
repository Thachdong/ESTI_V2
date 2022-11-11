import { SuppliersList } from "~modules-dashboard/pages/account/suppliers";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <SuppliersList />

Index.displayName = "Danh sách nhà cung cấp";

Index.layoutName = "Dashboard"

Index.data = {
  title: "TÀI KHOẢN / DANH SÁCH NHÀ CUNG CẤP"
}

export default Index;
