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

    // PREVENT USER ACCESS INDEX PAGE
    handleRedirectFromIndex();
  }, []);

  useEffect(() => {
    // SAVE CALLBACK URL
    handleCatchCallbackUrl();
  }, [router.isReady]);

  const handleRedirectFromIndex = useCallback(() => {
    const { pathname } = router;

    const token = localStorage.getItem("accessToken");

    if (pathname !== "/") return;

    if (!!token) {
      router.push(defaultRoute);
    } else {
      router.push("/auth/login/");
    }
  }, []);

  const handleCatchCallbackUrl = useCallback(() => {
    const { pathname } = router;

    if (
      pathname !== "/" ||
      !pathname.includes("login") ||
      !pathname.includes("/404")
    ) {
      localStorage.setItem("callbackUrl", pathname);
    }
  }, [router.isReady]);
};
