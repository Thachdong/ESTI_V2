import { CustomersList } from "~modules-dashboard/pages/account/customers";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <CustomersList />

Index.displayName = "Danh sách khách hàng";

Index.layoutName = "Dashboard";

Index.data = {
  title: "TÀI KHOẢN / DANH SÁCH KHÁCH HÀNG"
}

export default Index;
