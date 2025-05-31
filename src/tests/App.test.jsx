import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import App from "../App";
import { renderWithProviders } from "./test-utils.tsx";
import * as Utils from "../utils/utils.ts";
import { Lang, Mode } from "../types.ts";

describe("Test Terms Of Use Modal Popup", () => {
  it("Renders Terms Of Use Modal Popup should renders", () => {
    renderWithProviders(<App />);
    const termsOfUseElement = screen.queryByTestId("terms-of-use");
    expect(termsOfUseElement).toBeInTheDocument();
  });
  it("should render agree button", () => {
    renderWithProviders(<App />);
    const termsOfUseElement = screen.queryByTestId("terms-of-use-agree-btn");
    expect(termsOfUseElement).toBeInTheDocument();
  });
});

describe("test App compoent render", () => {
  const initialState1 = {
    preloadedState: {
      main: {
        fromLang: Lang.ro,
        sortVerbs: false,
        //verbs: data,
        mode: Mode.light,
        //numberOfVerbs: data.length,
      },
    },
  };
  const initialState2 = {
    preloadedState: {
      main: {
        fromLang: Lang.ro,
        sortVerbs: true,
        //verbs: data,
        mode: Mode.light,
        //numberOfVerbs: data.length,
      },
    },
  };
  it("shoul call getRandomVerbsOrder", () => {
    const spy = vi.spyOn(Utils, "getRandomVerbsOrder");
    renderWithProviders(<App />, initialState1);
    expect(spy).toHaveBeenCalled();
  });
  // it("should call getSortedVerbsOrder", () => {
  //   renderWithProviders(<App />, initialState2);
  //   const termsOfUseElement = screen.queryByTestId("terms-of-use-agree-btn");
  //   expect(termsOfUseElement).toBeInTheDocument();
  // });
});
