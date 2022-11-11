import { StaffsList } from "~modules-dashboard/pages/account/staffs";
import { TNextPageWithLayout } from "~types/_app";

export const Index: TNextPageWithLayout = () => <StaffsList />

Index.displayName = "Danh sách nhân viên";

Index.layoutName = "Dashboard";

Index.data = {
  title: "TÀI KHOẢN / DANH SÁCH NHÂN VIÊN"
}

export default Index;
