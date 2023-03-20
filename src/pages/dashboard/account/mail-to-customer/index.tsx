import { MailToCustomerPage } from "~modules-dashboard/pages/account/mail-to-customer";
import { TNextPageWithLayout } from "~types/_app";

export const Index: TNextPageWithLayout = () => <MailToCustomerPage />

Index.displayName = "Thông báo khách hàng";

Index.layoutName = "Dashboard";

Index.data = {
  title: "KHÁCH HÀNG / THÔNG BÁO"
}

export default Index;
