import { EmotionCache } from "@emotion/cache";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline, StyledEngineProvider } from "@mui/material";
import { ReactNode } from "react";
import {viVN} from "@mui/material/locale"
import { themeOptions } from "./theme/themeOptions";

type TProps = {
  emotionCache: EmotionCache;
  children: ReactNode;
};

const lightTheme = createTheme(themeOptions.lightThemeOptions, viVN);

export const MuiProvider: React.FC<TProps> = ({ emotionCache, children }) => (
  <CacheProvider value={emotionCache}>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={lightTheme}>
        <>
          <CssBaseline />
          {children}
        </>
      </ThemeProvider>
    </StyledEngineProvider>
  </CacheProvider>
);
