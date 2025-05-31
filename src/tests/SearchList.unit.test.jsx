import React, { act } from "react";
import { renderWithProviders } from "./test-utils.tsx";
import { describe, expect, it } from "vitest";

import SearchList from "../components/SearchList.tsx";
import { SearchListParams } from "../components/SearchList.tsx";
import data from "../data.json";
import { Lang, Mode } from "../types.ts";
import { defaultInitialState } from "./test-utils.tsx";
//import { queryAllByTestId, queryByTestId } from "@testing-library/react";

describe("Test SearchList", () => {
  const searchResults = data.filter((verb) => verb.nameRo[0].startsWith("ce"));
  const params = {
    searchResults,
    fromLang: Lang.ro,
    onItemClick: () => {},
  };

  it("should render SearchList", async () => {
    const { getByTestId } = renderWithProviders(
      <SearchList {...params} />,
      defaultInitialState
    );
    const searchListElement = getByTestId("search-list");
    expect(searchListElement).toBeVisible();
    expect(searchListElement.children.length).toEqual(searchResults.length);
    const firstSearchElement = searchListElement.children[0];
    await act(async () => {
      firstSearchElement.click();
    });
    //expect(params.onItemClick).toHaveBeenCalledTimes(1);
  });
  it("should not render SearchList", async () => {
    const paramsWithEmptyResults = {
      ...params,
      searchResults: [],
    };
    const { queryAllByTestId } = renderWithProviders(
      <SearchList {...paramsWithEmptyResults} />,
      defaultInitialState
    );
    const searchListElementQuery = queryAllByTestId("search-list");
    expect(searchListElementQuery.length).toEqual(0);
  });
});
