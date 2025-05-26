import React from 'react';
// import { render, screen } from "@testing-library/react";
import { renderWithProviders } from "./test-utils.tsx";
import { beforeAll, describe, expect, it } from "vitest";

import Footer from "../components/Footer.tsx";

describe("Test Footer", () => {
    const NUMBER_OF_VERBS = 100;

    beforeAll(() => {
        localStorage.setItem("numberOfVerbs", JSON.stringify(NUMBER_OF_VERBS));
    });
    it("test author", () => {
        const { getByTestId, getByText } = renderWithProviders(<Footer />);
        const footerAuthorElement = getByTestId("footer-author");
        expect(footerAuthorElement).toBeVisible();
        expect(footerAuthorElement.textContent).toEqual("Author: Oleksandr_Z");
    });
    it("test app version", () => {
        const { getByTestId, getByText } = renderWithProviders(<Footer />);
        const footerVersionElement = getByTestId("footer-version");
        expect(footerVersionElement).toBeVisible();
        expect(footerVersionElement.textContent).
            toEqual(`v${import.meta.env.VITE_APP_VERSION}-${NUMBER_OF_VERBS}`);
    });
});
