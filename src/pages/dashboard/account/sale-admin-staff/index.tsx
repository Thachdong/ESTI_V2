import { SaleAdminsList } from "~modules-dashboard/pages/account/saleAdmins";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <SaleAdminsList />

Index.displayName = "Danh sách sale admin";

Index.layoutName = "Dashboard"

Index.data = {
  title: "TÀI KHOẢN / DANH SÁCH NHÂN VIÊN SALE ADMIN"
}

export default Index;
