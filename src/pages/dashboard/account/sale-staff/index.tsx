import { SaleStaffsList } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <SaleStaffsList />

Index.displayName = "Danh sách nhân viên sale";

Index.layoutName = "Dashboard"

Index.data = {
  title: "TÀI KHOẢN / DANH SÁCH NHÂN VIÊN SALE"
}

export default Index;
