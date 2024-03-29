import { PublicLayout } from "src/modules/public/layouts";
import { DashboardLayout } from "~modules-dashboard/layouts";
import { TLayoutProps } from "~types/_app";

export const CoreLayout: React.FC<TLayoutProps> = ({ Page }) => {
  const { layoutName, data } = Page;

  switch (layoutName) {
    case "Dashboard":
      return <DashboardLayout data={data} Page={Page} />;
    case "PublicPage":
      return <PublicLayout Page={Page} />;
    default:
      return <Page />;
  }
};
