import { InputAdornment } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { ChangeEvent, useState, KeyboardEvent } from "react";
import { FormInputBase } from "./form-bases";

type TSearchBox = {
  handleSearch: (searchTerm: string) => void;
  isHotSearch?: boolean;
  label?: string;
};

export const SearchBox: React.FC<TSearchBox> = ({
  handleSearch,
  isHotSearch = false,
  label = "Tìm kiếm",
}) => {
  const [content, setContent] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (isHotSearch) {
      handleSearch(e.target.value);
    }

    setContent(e.target.value);
  };

  const handleEnter = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.code === "Enter") {
      handleSearch(content);
    }
  };

  const endAdornment = (
    <InputAdornment
      position="end"
      onClick={() => handleSearch(content)}
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
