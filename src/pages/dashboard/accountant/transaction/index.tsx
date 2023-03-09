import { TransactionPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <TransactionPage />;

Index.displayName = "Quản lý giao dịch";

Index.layoutName = "Dashboard";

Index.data = {
  title: "QUẢN LÝ GIAO DỊCH",
};

export default Index;
