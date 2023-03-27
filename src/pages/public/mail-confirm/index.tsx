import { MailConfirmPage } from "src/modules/public/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <MailConfirmPage />

Index.displayName = "Phản hồi email báo giá";

Index.layoutName = "PublicPage";

export default Index;