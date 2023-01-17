import { getSession } from "next-auth/react";
import { useEffect } from "react";
import { setBearerToken } from "src/api/instance";
import dynamic from "next/dynamic";
import { TinyMCE } from "tinymce";

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
  useEffect(() => {
    handleSetBearerToken();
  }, []);

  async function handleSetBearerToken() {
    const session = await getSession();

    const { accessToken } = session || {};

    accessToken && setBearerToken(accessToken);
  }
};
