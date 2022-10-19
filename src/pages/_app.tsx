import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "~styles/globals.css";

import { IMyAppProps } from "src/types/_app";
import { SessionProvider } from "next-auth/react";
import { createEmotionCache } from "~modules-core/providers/mui-provider/theme/utility";
import { MuiProvider, ReactQueryProvider } from "~modules-core/providers";

const clientEmotionCache = createEmotionCache();

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
  emotionCache = clientEmotionCache,
}: IMyAppProps) {
  return (
    <SessionProvider session={session}>
      <ReactQueryProvider>
        <MuiProvider emotionCache={emotionCache}>
          <Component {...pageProps} />
        </MuiProvider>
      </ReactQueryProvider>
    </SessionProvider>
  );
}

export default MyApp;
