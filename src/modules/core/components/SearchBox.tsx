// THIS COMPONENTS ONLY DEAL WITH URL VIA USEROUTER HOOK
import { InputAdornment } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { ChangeEvent, useState, KeyboardEvent } from "react";
import { FormInputBase } from "./form-bases";
import { useRouter } from "next/router";

type TSearchBox = {
  isHotSearch?: boolean;
  label?: string;
};

export const SearchBox: React.FC<TSearchBox> = ({
  isHotSearch = false,
  label = "Tìm kiếm",
}) => {
  const router = useRouter();

  const { query } = router;

  const [content, setContent] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (isHotSearch) {
      router.push({ query: { ...query, searchContent: e.target.value } });
    }

    setContent(e.target.value);
  };

  const handleEnter = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.code === "Enter") {
      router.push({ query: { ...query, searchContent: content } });
    }
  };

  const endAdornment = (
    <InputAdornment
      position="end"
      onClick={() =>  router.push({ query: { ...query, searchContent: content } })}
      className="cursor-pointer"
    >
      <SearchRoundedIcon />
    </InputAdornment>
  );

  return (
    <FormInputBase
      InputProps={{ endAdornment }}
      onChange={handleChange}
      onKeyPress={handleEnter}
      label={label}
    />
  );
};
