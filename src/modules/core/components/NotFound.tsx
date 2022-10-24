import React from "react";
import Lottie from "react-lottie";
import * as notFound from "~assets/json/not-found.json";
import styles from "~modules-core/styles/notfound.module.css";

export const NotFound = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: notFound,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className={styles["notfound"]}>
      <Lottie options={defaultOptions} width={"auto"} height={450} />
    </div>
  );
};
