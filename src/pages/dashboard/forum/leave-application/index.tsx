import { LeaveApplycationPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <LeaveApplycationPage />;

Index.displayName = "Nghỉ phép";

Index.layoutName = "Dashboard";

Index.data = {
  title: "NGHỈ PHÉP",
};

export default Index;
