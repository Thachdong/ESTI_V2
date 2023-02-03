import { useCallback, useEffect } from "react";
import { setBearerToken } from "src/api/instance";
import dynamic from "next/dynamic";
import { TinyMCE } from "tinymce";
import { useRouter } from "next/router";
import { defaultRoute } from "~modules-core/constance";

// INIT TINYMCE
dynamic(
  () =>
    require("tinymce").then((tinymce: TinyMCE) =>
      tinymce.init({
        language_url: "tinymce/langs/vi.js",
      })
    ),
  { ssr: false }
);

export const useStartUp = () => {
  const router = useRouter();

  useEffect(() => {
    // SET TOKEN EVERYTIME APP INITIALIZE
    setBearerToken();
  }, []);

  useEffect(() => {
    // SAVE CALLBACK URL
    handleCatchCallbackUrl();

    // PREVENT USER ACCESS INDEX PAGE
    handleRedirectFromIndex();
  }, [router.isReady]);

  const handleRedirectFromIndex = useCallback(() => {
    const { asPath } = router;

    const token = localStorage.getItem("accessToken");

    switch (true) {
      case !token: {
        const callbackUrl = (!asPath && asPath === "/") ? defaultRoute : asPath;

        router.push(`/auth/login/${callbackUrl}`);
        break;
      }
      case asPath === "/" || !asPath:
        router.push(defaultRoute);
        break;
      default:
        break;
    }
  }, [router.isReady]);

  const handleCatchCallbackUrl = useCallback(() => {
    const { pathname } = router;

    localStorage.setItem("callbackUrl", pathname);
  }, [router.isReady]);
};
