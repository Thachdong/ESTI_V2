import { NotFound } from "~modules-core/components";
import { DashboardLayout } from "~modules-dashboard/layouts";
import { TNextPageWithLayout } from "~types/_app";

const NotFoundPage: TNextPageWithLayout = () => <NotFound />;

NotFoundPage.displayName = "Không tìm thấy trang!";

NotFoundPage.getLayout = () => (
  <DashboardLayout title="Không tìm thấy trang!">
    <NotFoundPage />
  </DashboardLayout>
);

export default NotFoundPage;
