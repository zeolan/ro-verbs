import React from "react";
// import { render, screen } from "@testing-library/react";
import { renderWithProviders } from "./test-utils.tsx";
import { describe, expect, it } from "vitest";

import Footer from "../components/Footer.tsx";
import { Mode, Lang } from "../types.ts";
//import type { RootState } from "../store/store.ts";
import { defaultInitialState } from "./test-utils.tsx";

describe("Test Footer", () => {
  const NUMBER_OF_VERBS = defaultInitialState.preloadedState.main.verbs.length;
  const initialState = defaultInitialState;

  it("test author", () => {
    const { getByTestId } = renderWithProviders(<Footer />);
    const footerAuthorElement = getByTestId("footer-author");
    expect(footerAuthorElement).toBeVisible();
    expect(footerAuthorElement.textContent).toEqual("Author: Oleksandr_Z");
  });
  it("test app version", () => {
    const { getByTestId } = renderWithProviders(<Footer />, initialState);
    const footerVersionElement = getByTestId("footer-version");
    expect(footerVersionElement).toBeVisible();
    expect(footerVersionElement.textContent).toEqual(
      `v${import.meta.env.VITE_APP_VERSION}-${NUMBER_OF_VERBS}`
    );
  });
});
