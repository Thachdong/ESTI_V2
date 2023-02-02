import { useEffect, useState } from "react";

type TSession = {
  accessToken: string | null;
  userInfo: any;
};

export const useSession = () => {
  const [session, setSession] = useState<TSession>({
    accessToken: null,
    userInfo: null,
  });

  useEffect(() => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const rawUserInfo = localStorage.getItem("userInfo");

      const userInfo = JSON.parse(rawUserInfo as string);

      const menu = JSON.parse(localStorage.getItem("menu") as string);

      setSession({ accessToken, userInfo });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return session;
};
