import type { AppProps } from 'next/app';
import { EmotionCache } from "@emotion/cache";
import { NextPage } from 'next';
import { Session } from 'next-auth';

type TPageProps = {
  session: Session
}

interface IMyAppProps extends AppProps<TPageProps> {
  emotionCache?: EmotionCache;
}


interface IMyNextPage extends NextPage {

}