import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Lottie from "react-lottie";
import * as notFound from "~assets/json/not-found.json";
import styles from "~modules-core/styles/notfound.module.css";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: notFound,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      router.push("/auth/login");
    }
  }, []);

  return (
    <div className={styles["notfound"]}>
      <Lottie options={defaultOptions} width={"auto"} height={450} />
    </div>
  );
};
