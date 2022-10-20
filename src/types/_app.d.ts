import type { AppProps } from "next/app";
import { EmotionCache } from "@emotion/cache";
import { NextPage } from "next";
import { Session } from "next-auth";

type TPageProps = {
  session: Session;
};

type TNextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface IMyAppProps extends AppProps<TPageProps> {
  emotionCache?: EmotionCache;
  Component: TNextPageWithLayout;
}
