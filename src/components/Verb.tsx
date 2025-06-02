import React, { useState, useEffect, JSX } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useTheme } from "@mui/material/styles";
import cx from "classnames";

import { OutlinedButton, VerbButton } from "./MyButtons.js";
import HintTooltip from "./HintTooltip.tsx";
import {
  getVerbs,
  getVerb,
  setVerb,
  setShowConjugation,
  getShowTooltip,
  setShowTooltip,
  setVerbIdx,
  getVerbIdx,
  getVerbsOrder,
  getFromLang,
} from "../store/reducer.ts";
import { getVerbByIdx } from "../utils/utils.ts";
import { IVerb, Lang } from "../types.ts";
import SearchVerb from "./SearchVerb.tsx";

const Verb: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const verbs = useSelector(getVerbs);
  const verb = useSelector(getVerb);
  const verbIdx = useSelector(getVerbIdx);
  const verbsOrder = useSelector(getVerbsOrder);
  const tooltipOpen = useSelector(getShowTooltip);
  const fromLang = useSelector(getFromLang);

  const [lang, setLang] = useState<Lang>(fromLang);
  const [showSearchInput, setShowSearchInput] = useState<boolean>(false);
  const [localNameRu, setLocalNameRu] = useState<string>("");
  const [localNameRo, setLocalNameRo] = useState<string | JSX.Element | null>(
    null
  );

  useEffect(() => {
    if (verb) {
      setLang(fromLang);
      setTimeout(
        () => {
          setLocalNameRu(verb.nameRu);
          setLocalNameRo(getNameRo());
        },
        lang !== fromLang ? 100 : 0
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verb, fromLang]);

  const translate = () => {
    dispatch(setShowTooltip(false));
    setShowSearchInput(false);
    lang === Lang.ro ? setLang(Lang.ru) : setLang(Lang.ro);
  };

  const getNameRo = (): string | JSX.Element | null => {
    if (
      typeof verb!.nameRo === "object" &&
      verb !== null &&
      verb?.nameRo[0] &&
      verb?.nameRo[1] &&
      typeof verb.nameRo[0] === "string" &&
      typeof verb.nameRo[1] === "number"
    ) {
      const name = verb.nameRo[0].split("");
      let key = 1;
      const result = name.map((item: string) => {
        return key !== verb.nameRo[1] ? (
          item !== " " ? (
            <span key={++key}>{item}</span>
          ) : (
            <span key={++key}>&nbsp;</span>
          )
        ) : (
          <span key={++key} style={{ textDecoration: "overline" }}>
            {item}
          </span>
        );
      });
      return <>{result}</>;
    } else {
      return "ERROR";
    }
  };

  const hideTooltip = () => {
    dispatch(setShowTooltip(false));
  };

  const onConjugationClick = () => {
    hideTooltip();
    dispatch(setShowConjugation(true));
  };

  const onNextClick = () => {
    hideTooltip();
    setShowSearchInput(false);
    let idx = verbIdx + 1;
    if (idx >= verbsOrder.length) {
      idx = 0;
    }
    dispatch(setVerbIdx(idx));
    const foundVerb = getVerbByIdx(verbs, verbsOrder[idx]);
    if (foundVerb) {
      dispatch(setVerb(foundVerb));
    }
  };

  const onPrevClick = () => {
    hideTooltip();
    setShowSearchInput(false);
    let idx = verbIdx - 1;
    if (verbIdx <= 0) {
      idx = verbsOrder.length - 1;
    }
    dispatch(setVerbIdx(idx));
    const foundVerb = getVerbByIdx(verbs, verbsOrder[idx]);
    if (foundVerb) {
      dispatch(setVerb(foundVerb));
    }
  };

  const onSearchClick = () => {
    hideTooltip();
    setShowSearchInput(true);
  };

  const onCancelSearchClick = () => {
    setShowSearchInput(false);
  };

  const onListItemClick = (item: IVerb) => {
    dispatch(setVerb(item));

    let searchedVerbIdx = -1;
    verbsOrder.forEach((verbId, index) => {
      if (item.id === verbId) {
        searchedVerbIdx = index;
      }
    });

    if (searchedVerbIdx > -1) {
      dispatch(setVerbIdx(searchedVerbIdx));
    }
    onCancelSearchClick();
  };

  const getVerbDisplay = (side: string) => {
    return side === "front"
      ? fromLang === Lang.ru
        ? localNameRu
        : localNameRo
      : fromLang === Lang.ro
      ? localNameRu
      : localNameRo;
  };

  const getVerbFontSize = () => {
    return lang === Lang.ru
      ? localNameRu.length > 60
        ? "0.8em"
        : localNameRu.length > 35
        ? "0.9em"
        : "1em"
      : "1em";
  };

  return verb ? (
    <div className="App-verb" onClick={hideTooltip}>
      {showSearchInput ? (
        <SearchVerb
          onCancel={onCancelSearchClick}
          onItemClick={onListItemClick}
        />
      ) : (
        <>
          <div className="App-verb-block1">
            <div
              className={cx("App-verb-block1-button", "front", {
                rotated: fromLang !== lang,
              })}
            >
              <HintTooltip open={tooltipOpen}>
                <VerbButton
                  variant="contained"
                  onClick={translate}
                  style={{ fontSize: getVerbFontSize() }}
                >
                  {getVerbDisplay("front")}
                </VerbButton>
              </HintTooltip>
            </div>

            <div
              className={cx("App-verb-block1-button", "back", {
                rotated: fromLang !== lang,
              })}
            >
              <VerbButton
                variant="contained"
                onClick={translate}
                sx={{ pt: "7px" }}
                style={{ fontSize: getVerbFontSize() }}
              >
                {getVerbDisplay("back")}
              </VerbButton>
            </div>
          </div>
          <div className="App-verb-buttons">
            <OutlinedButton
              onClick={onPrevClick}
              startIcon={<ArrowBackIcon />}
              sx={{ borderColor: theme.palette.primary.main }}
            ></OutlinedButton>
            <OutlinedButton
              onClick={onConjugationClick}
              sx={{ borderColor: theme.palette.primary.main }}
            >
              СПРЯЖЕНИЕ
            </OutlinedButton>
            <OutlinedButton
              onClick={onNextClick}
              endIcon={<ArrowForwardIcon />}
              sx={{ borderColor: theme.palette.primary.main }}
            ></OutlinedButton>
          </div>
          <div className="App-verb-search-icon">
            <IconButton onClick={onSearchClick}>
              <Search fontSize="large" color="primary" />
            </IconButton>
          </div>
        </>
      )}
    </div>
  ) : (
    <div className="App-verb"></div>
  );
};

export default Verb;
