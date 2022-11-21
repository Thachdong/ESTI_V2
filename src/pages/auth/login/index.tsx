import { LoginPage } from "~modules-auth/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <LoginPage />

Index.displayName = "Trang đăng nhập";

export default Index;