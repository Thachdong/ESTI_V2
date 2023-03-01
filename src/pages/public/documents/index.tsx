import { DocumentsPage } from "src/modules/public/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <DocumentsPage />

Index.displayName = "Tài liệu sản phẩm";

Index.layoutName = "PublicPage";

export default Index;