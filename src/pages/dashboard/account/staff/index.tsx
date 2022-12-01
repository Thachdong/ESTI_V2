import { StaffsPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

export const Index: TNextPageWithLayout = () => <StaffsPage />

Index.displayName = "Danh sách nhân viên";

Index.layoutName = "Dashboard";

Index.data = {
  title: "TÀI KHOẢN / DANH SÁCH NHÂN VIÊN"
}

export default Index;
