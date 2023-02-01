import { useRouter } from "next/router";
import { useEffect } from "react";

export const usePathBaseFilter = (pagination?: TPagination) => {
  const router = useRouter();

  const { query, isReady } = router;

  // PUSH PAGINATION QUERY
  useEffect(() => {
    const initQuery = {
      ...query,
      pageIndex: pagination?.pageIndex,
      pageSize: pagination?.pageSize,
    };

    (isReady && !!pagination) && router.push({ query: initQuery });
  }, [pagination, isReady]);
};
