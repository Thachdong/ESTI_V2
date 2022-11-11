import { DeliveryStaffsList } from "~modules-dashboard/pages/account/deliveryStaffs";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <DeliveryStaffsList />

Index.displayName = "Danh sách nhân viên phân phối";

Index.layoutName = "Dashboard"

Index.data = {
  title: "TÀI KHOẢN / DANH SÁCH NHÂN VIÊN PHÂN PHỐI"
}

export default Index;
