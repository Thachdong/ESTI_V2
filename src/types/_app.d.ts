import type { AppProps } from "next/app";
import { EmotionCache } from "@emotion/cache";
import { NextPage } from "next";
import { Session } from "next-auth";
import { ReactElement } from "react";

type TPageProps = {
  session: Session;
};

type TNextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  layoutName?: string,
  data?: any
};

interface IMyAppProps extends AppProps<TPageProps> {
  emotionCache?: EmotionCache;
  Component: TNextPageWithLayout;
}

type TLayoutProps = {
  Page: TNextPageWithLayout;
}
