import "moment/locale/vi";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { EmotionCache } from "@emotion/cache";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import {
  createTheme,
  CssBaseline,
  StyledEngineProvider,
  ThemeOptions,
} from "@mui/material";
import { ReactNode } from "react";
import { themeOptions } from "./theme/themeOptions";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { viVN as dataGridVN } from "@mui/x-data-grid";
import { viVN as muiViVN } from "@mui/material/locale";

type TProps = {
  emotionCache: EmotionCache;
  children: ReactNode;
};

// const themeOptions: ThemeOptions = {
//   palette: {
//     mode: "light",
//   },
//   components: {
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           size: 30
//         }
//       }
//     }
//   },
// };

const lightTheme = createTheme(
  themeOptions.lightThemeOptions,
  muiViVN,
  dataGridVN
);

export const MuiProvider: React.FC<TProps> = ({ emotionCache, children }) => (
  <CacheProvider value={emotionCache}>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={lightTheme}>
        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="vi">
          <>
            <CssBaseline />
            {children}
          </>
        </LocalizationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </CacheProvider>
);
