/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";

type TProps = {
  title: string;
  BgImage: string;
  value: number;
};

export const CardReport: React.FC<TProps> = ({
  title = "Anonymous",
  BgImage = "Orange" || "Green" || "Black" || "Red",
  value = 0,
}) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    switch (true) {
      case BgImage === "Orange":
        setImage("../../Rectangle_100.png");
        break;
      case BgImage === "Green":
        setImage("../../Rectangle_101.png");
        break;
      case BgImage === "Black":
        setImage("../../Rectangle_102.png");
        break;
      case BgImage === "Red":
        setImage("../../Rectangle_103.png");
        break;
      default:
        break;
    }
  }, [BgImage]);

  return (
    <div className="font-semibold text-white relative">
      <div className="w-[100%] h-[100%] ">
        <img
          src={image || ""}
          className="w-[100%] h-[100%]"
          alt="Thẻ báo cáo"
        />
      </div>
      <div className="absolute z-40 top-4 left-5 grid font-bold uppercase">
        <span className="mb-[18px] text-xl">{title}</span>
        <span className="text-4xl">{value}</span>
      </div>
    </div>
  );
};
