import { TechnicalDocumentsPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <TechnicalDocumentsPage />

Index.displayName = "Tài liệu theo ngành";

Index.layoutName = "Dashboard";

Index.data = {
    title: "Quan lý sản phẩm / tài liệu theo ngành"
};

export default Index;