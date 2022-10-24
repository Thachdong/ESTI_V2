import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "react-toastify/dist/ReactToastify.css";
import "nprogress/nprogress.css";
import "~styles/globals.css";

import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import { useState } from "react";

import { IMyAppProps } from "src/types/_app";
import { createEmotionCache } from "~modules-core/providers/mui-provider/theme/utility";
import { MuiProvider, ReactQueryProvider } from "~modules-core/providers";
import { toastOptions } from "~modules-core/toast";
import { useNprogress } from "~modules-core/customHooks/useNprogress";

const clientEmotionCache = createEmotionCache();

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
  emotionCache = clientEmotionCache,
}: IMyAppProps) {
  const [loading, setLoading] = useState(false);

  useNprogress(setLoading);

  const getLayout = Component.getLayout ?? ((page) => page);

  const displayName = Component.displayName;

  return (
    <SessionProvider session={session}>
      <ReactQueryProvider>
        <MuiProvider emotionCache={emotionCache}>
          <Head>
            <link rel="icon" type="image/png" href="/logo.ico" />
            <title>{loading ? "Đang chuyển hướng..." : displayName}</title>
          </Head>

          <ToastContainer {...toastOptions} />

          {getLayout(<Component {...pageProps} />)}
        </MuiProvider>
      </ReactQueryProvider>
    </SessionProvider>
  );
}

export default MyApp;
