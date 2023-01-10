import React from "react";
import Lottie from "react-lottie";
import * as loading from "~assets/json/loading.json";

export const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex items-center h-screen z-50 relative ">
      <Lottie options={defaultOptions} width={200} height={200} />
    </div>
  );
};
