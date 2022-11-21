import React, { ReactNode } from "react";
import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { toast } from "~modules-core/toast";

const CATCHE_TIME_IN_MILISECONDS = 30000;
const REFETCH_INTERVAL_IN_MILISECONDS = 30000;
const STALE_TIME_IN_MILISECONDS = 30000;

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnMount: "always",
      refetchOnWindowFocus: false,
      refetchOnReconnect: "always",
      refetchIntervalInBackground: false,
      suspense: false,
      staleTime: STALE_TIME_IN_MILISECONDS,
      cacheTime: CATCHE_TIME_IN_MILISECONDS,
      refetchInterval: REFETCH_INTERVAL_IN_MILISECONDS,
    },
    mutations: {
      retry: false,
    },
  },
};

export const queryClient = new QueryClient(queryClientConfig);

type TProps = {
  children: ReactNode;
};

export const ReactQueryProvider: React.FC<TProps> = ({ children }) => (
  <QueryClientProvider client={queryClient} contextSharing={true}>
    {children}
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);


// FOR MORE DETAIL, PLEASE VISIT:
// https://dev.to/nnajiforemma10/react-query-series-part-1-basic-react-query-setup-12g4