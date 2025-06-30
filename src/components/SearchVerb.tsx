import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import BackspaceIcon from "@mui/icons-material/Backspace";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import { IVerb, Lang } from "../types.ts";
import SearchList from "./SearchList.tsx";
import { searchVerbs } from "../utils/utils.ts";
import { getFromLang, getVerbs } from "../store/reducer.ts";

interface SearchListParams {
  onItemClick: (item: IVerb) => void;
  onCancel: () => void;
}

const SearchVerb: React.FC<SearchListParams> = ({ onItemClick, onCancel }) => {
  const verbs = useSelector(getVerbs);
  const fromLang = useSelector(getFromLang);
  const [searchLang, setSearchLang] = useState<Lang>(fromLang);
  const [searchString, setSearchString] = useState<string>("");
  const [searchResults, setSearchResults] = useState<IVerb[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const onSearchChange = (e: Event | React.SyntheticEvent | InputEvent) => {
    if (!e.target) return;
    const target = e.target as HTMLInputElement;
    setSearchString(target.value);
    const searchString = target.value.trim();
    const [results, lang] = searchVerbs(verbs, searchString);
    setSearchResults(results);
    if (lang) {
      setSearchLang(lang);
    }
  };

  const handleClearSearchString = () => {
    setSearchResults([]);
    setSearchString("");
    inputRef && inputRef.current && inputRef.current.focus();
  };

  const onCancelSearchClick = () => {
    setSearchString("");
    setSearchResults([]);
    onCancel();
  };

  const onListItemClick = (item: IVerb) => {
    onItemClick(item);
  };

  return (
    <div className="App-verb-search-block">
      <TextField
        className="App-verb-search-input"
        id="search-input"
        label="Поиск"
        size="medium"
        inputRef={inputRef}
        variant="outlined"
        autoFocus={true}
        value={searchString}
        onChange={onSearchChange}
        autoComplete="off"
        style={{ paddingRight: "0 !important" }}
        InputProps={{
          endAdornment: (
            <InputAdornment
              position="end"
              sx={{
                position: "relative",
                visibility: searchString.length ? "visible" : "hidden",
              }}
            >
              <IconButton onClick={handleClearSearchString} edge="end">
                <BackspaceIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <IconButton
        onClick={onCancelSearchClick}
        className="App-verb-search-block_close-btn"
      >
        <Close />
      </IconButton>
      <SearchList
        searchResults={searchResults}
        searchLang={searchLang}
        onItemClick={onListItemClick}
      />
    </div>
  );
};

export default SearchVerb;
