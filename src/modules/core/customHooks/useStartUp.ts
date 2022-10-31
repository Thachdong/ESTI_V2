import { getSession } from "next-auth/react";
import { useEffect } from "react";
import { setBearerToken } from "src/api/instance";

export const useStartUp = () => {
  useEffect(() => {
    handleSetBearerToken();
  }, []);

  async function handleSetBearerToken() {
    const { accessToken } = (await getSession()) || {};

    accessToken && setBearerToken(accessToken);
  }
};
