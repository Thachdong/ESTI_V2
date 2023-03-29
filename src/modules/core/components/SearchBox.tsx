// THIS COMPONENTS ONLY DEAL WITH URL VIA USEROUTER HOOK
import { InputAdornment } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { ChangeEvent, useState, KeyboardEvent } from "react";
import { FormInputBase } from "./form-bases";
import { useRouter } from "next/router";
import clsx from "clsx";

type TSearchBox = {
  isHotSearch?: boolean;
  label?: string;
  callback?: (val: string) => void;
  disabledRouterSearch?: boolean;
  className?: string;
};

export const SearchBox: React.FC<TSearchBox> = ({
  isHotSearch = false,
  label = "Tìm kiếm",
  callback,
  disabledRouterSearch = false,
  className
}) => {
  const router = useRouter();

  const { query } = router;

  const [content, setContent] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (isHotSearch) {
      !disabledRouterSearch && router.push({ query: { ...query, searchContent: e.target.value } });
      callback?.(e.target.value);
    }

    setContent(e.target.value);
  };

  const handleEnter = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.code.includes("Enter")) {
      !disabledRouterSearch && router.push({ query: { ...query, searchContent: content } });
      callback?.(content);
    }
  };

  const endAdornment = (
    <InputAdornment
      position="end"
      onClick={() => {
        !disabledRouterSearch && router.push({ query: { ...query, searchContent: content } });
        callback?.(content);
      }}
      className="cursor-pointer "
    >
      <SearchRoundedIcon className="text-main" />
    </InputAdornment>
  );

  return (
    <FormInputBase
      InputProps={{ endAdornment }}
      onChange={handleChange}
      onKeyPress={handleEnter}
      label={label}
      value={content}
      shrinkLabel
      className={clsx("min-w-[250px] w-[250px] max-w-[300px] lg:min-w-[350px] lg:w-[350px] lg:max-w-[400px]", className)}
    />
  );
};
