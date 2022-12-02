import { CustomersPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <CustomersPage />

Index.displayName = "Danh sách khách hàng";

Index.layoutName = "Dashboard";

Index.data = {
  title: "TÀI KHOẢN / DANH SÁCH KHÁCH HÀNG"
}

export default Index;