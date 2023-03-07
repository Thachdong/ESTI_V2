import { CustomerDetailPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <CustomerDetailPage />

Index.displayName = "Chi tiết khách hàng";

Index.layoutName = "Dashboard";

Index.data = {
  title: "TÀI KHOẢN / CHI TIẾT KHÁCH HÀNG"
}

export default Index;