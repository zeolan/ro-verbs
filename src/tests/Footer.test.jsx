import React from 'react';
// import { render, screen } from "@testing-library/react";
import { renderWithProviders } from "./test-utils.tsx";
import { describe, expect, it } from "vitest";

import Footer from "../components/Footer.tsx";
//import type { RootState } from "../store/store.ts";
import data from "../data.json";

describe("Test Footer", () => {
    const NUMBER_OF_VERBS = data.length;
    const initialState = {
        main: {
            numberOfVerbs: NUMBER_OF_VERBS,
        },
    };
    
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
        expect(footerVersionElement.textContent).
            toEqual(`v${import.meta.env.VITE_APP_VERSION}-${NUMBER_OF_VERBS}`);
    });
});
