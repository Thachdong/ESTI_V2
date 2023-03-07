import { CustomerCarePage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <CustomerCarePage />

Index.displayName = "Danh sách CSKH";

Index.layoutName = "Dashboard";

Index.data = {
  title: "TÀI KHOẢN / DANH SÁCH CSKH"
}

export default Index;