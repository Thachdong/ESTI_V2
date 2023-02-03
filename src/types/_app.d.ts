import type { AppProps } from "next/app";
import { EmotionCache } from "@emotion/cache";
import { NextPage } from "next";
import { ReactElement } from "react";

type TNextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  layoutName?: string,
  data?: any
};

interface IMyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: TNextPageWithLayout;
}

type TLayoutProps = {
  Page: TNextPageWithLayout;
}
